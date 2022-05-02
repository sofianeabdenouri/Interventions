import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl, ValidatorFn } from '@angular/forms';
import { VerifierCaracteresValidator } from '../shared/longueur-minimum.component';
import { ProblemeService } from './probleme.service';
import { ITypeProbleme } from './probleme';
import { IProbleme } from './problemedesc';
import { Router } from '@angular/router';


@Component({
  selector: 'Inter-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit {
 
  problemeForm: FormGroup;
  typesProbleme: ITypeProbleme[]
  errorMessage: string;
  problemeDesc: IProbleme;
  constructor(private fb: FormBuilder, private problemes: ProblemeService, private route: Router) { }

  ngOnInit() {
    this.problemeForm = this.fb.group({
      prenom: ['' , [VerifierCaracteresValidator.longueurMinimum(3), Validators.required]],
      nom: ['' , [VerifierCaracteresValidator.longueurMinimum(3), Validators.required]], 
      noTypeProbleme: ['', Validators.required], 
      courrielGroup: this.fb.group({
          courriel: [{value: '', disabled: true}],
          courrielConfirmation: [{value: '', disabled: true}],
        }),
      telephone: [{value: '', disabled: true}],      

    });
    this.problemes.obtenirTypesProbleme()
    .subscribe(typesProbleme => this.typesProbleme = typesProbleme,
               error => this.errorMessage = <any>error);  
    }
    setNotification(typeNotification: string): void {
    const telephone = this.problemeForm.get('telephone');
    telephone.clearValidators();
    telephone.reset();  // Pour enlever les messages d'erreur si le controle contenait des données invaldides
    telephone.disable();  

    const courriel = this.problemeForm.get('courrielGroup.courriel');   
    courriel.clearValidators();
    courriel.reset();  // Pour enlever les messages d'erreur si le controle contenait des données invaldides
    courriel.disable();

    const courrielConfirmation = this.problemeForm.get('courrielGroup.courrielConfirmation'); 
    courrielConfirmation.clearValidators();
    courrielConfirmation.reset();  // Pour enlever les messages d'erreur si le controle contenait des données invaldides
    courrielConfirmation.disable();
    if (typeNotification == 'telephone') {   
      // telephone.setValidators([Validators.required]);      
      telephone.enable();  
    
      
      // Si le validateur est dans un autre fichier l'écire sous la forme suivante : 
      // ...Validators.compose([classeDuValidateur.NomDeLaMethode()])])
    }
    if (typeNotification === 'courriel')
      {
        // courriel.setValidators([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]);              
        courriel.enable(); 
        courriel.updateValueAndValidity();         
        courrielConfirmation.enable();         
  
      }
    
  telephone.updateValueAndValidity();   
  courrielConfirmation.updateValueAndValidity();   

  }
  save(): void {
    if (this.problemeForm.dirty && this.problemeForm.valid) {
        // Copy the form values over the problem object values
        this.problemeDesc = this.problemeForm.value;
        this.problemeDesc.id = 0;
        //  if(this.problemeForm.get('courrielGroup.courriel').value != '')
        // {
        //   this.problemeDesc.courriel = this.problemeForm.get('courrielGroup.courriel').value;
        // }
    
        this.problemes.saveProbleme(this.problemeDesc)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
          })
    } else if (!this.problemeForm.dirty) {
        this.onSaveComplete();
    }
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.problemeForm.reset();  // Pour remettre Dirty à false.  Autrement le Route Guard va dire que le formulaire n'est pas sauvegardé
    this.route.navigate(['/accueil']);
  }
    }

    export class emailMatcherValidator {
      static courrielDifferents(): ValidatorFn {
          return (c: AbstractControl): { [key: string]: boolean } | null => {
              if (!c['controls'].courriel.value || !c['controls'].courrielConfirmation.value) {
                return null;
              }
              return c['controls'].courriel.value === c['controls'].courrielConfirmation.value ? null : { match: true };
          };
      }  
  }


  


  
  

