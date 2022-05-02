import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { ProblemeComponent } from './probleme.component';
import { ProblemeService } from './probleme.service';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule],
      declarations: [ ProblemeComponent ],
      providers:[ ProblemeService  ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  it("#1 | Zone PRÉNOM invalide avec 2 caractères", () =>{
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue("a".repeat(2));
    let errors = zone.errors || {};
    expect(errors['minlength']).toBeTruthy();
    });
  it("#2 | Zone PRÉNOM valide avec 3 caractères", () =>{
      let zone = component.problemeForm.controls['prenom'];
      zone.setValue("a".repeat(3));
      let errors = zone.errors || {};
      expect(errors['minlength']).toBeFalsy();
   });
     it("#3 | Zone PRÉNOM valide avec 200 caractères", () =>{
     let zone = component.problemeForm.controls['prenom'];
     zone.setValue("a".repeat(200));
     let errors = zone.errors || {};
     expect(errors['minlength']).toBeFalsy();
    });
    it("#4 | Zone PRÉNOM invalide avec aucune valeur", () =>{
      let zone = component.problemeForm.controls['prenom'];
      zone.setValue("a".repeat(0));
      let errors = zone.errors || {};
      expect(errors['required']).toBeTruthy();
     });
     it("#5 | Zone PRÉNOM valide avec 10 espaces", () =>{
      let zone = component.problemeForm.controls['prenom'];
      zone.setValue(" ".repeat(10));
      let errors = zone.errors || {};
      expect(errors['required']).toBeFalsy();
     });
     it("#6 | Zone PRÉNOM valide avec 2 espaces et 1 caractère", () =>{
      let zone = component.problemeForm.controls['prenom'];
      zone.setValue("a".repeat(1) + " ".repeat(2));
      let errors = zone.errors || {};
      expect(errors['minlength']).toBeFalsy();
     });
     it("#15 | Zone TELEPHONE est désactivée quand ne pas me notifier", () =>{
       component.setNotification('telephone');
       let zone = component.problemeForm.get('telephone');
       expect(zone.status).toEqual('DISABLED');
    });
    it("#16 | Zone TELEPHONE est vide quand ne pas me notifier", () =>{
      component.setNotification('telephone');
      let errors = {};
      let zone = component.problemeForm.get('telephone');
      zone.setValue('');
      errors = zone.errors || {};
      expect(errors['required']).toBeTruthy(); 
    });

      it("#17 | Zone ADRESSE COURRIEL est désactivée quand ne pas me notifier", () =>{
        component.setNotification('courrielGroupe.courriel');

       let zone = component.problemeForm.get('courrielGroup.courriel');
       expect(zone.status).toEqual('DISABLED');
      });

        it("#18 | Zone CONFIRMER COURRIEL est désactivée quand ne pas me notifier", () =>{
          component.setNotification('courrielGroup.courrielConfirmation');

       let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
       expect(zone.status).toEqual('DISABLED');
        });
        it('#19 | Zone TELEPHONE est désactivée quand notifier par courriel', () => {
          component.setNotification('pasnotification');
          let zone = component.problemeForm.get('telephone');
          expect(zone.status).toEqual('DISABLED'); 
        });
        it('#20 | Zone ADRESSE COURRIEL est activée quand notifier par courriel', () => {
          component.setNotification('pasnotification');
          let zone = component.problemeForm.get('telephone');
          expect(zone.status).toEqual('DISABLED'); 
        });
        it('#21 | Zone CONFIRMER COURRIEL est activée quand notifier par courriel', () => {
          component.setNotification('pasnotification');
          let zone = component.problemeForm.get('telephone');
          expect(zone.status).toEqual('DISABLED'); 
        });
        it('#22 | Zone ADRESSE COURRIEL est invalide sans valeur quand notifier par courriel', () => {
          component.setNotification('pasnotification');
          let zone = component.problemeForm.get('telephone');
          expect(zone.status).toEqual('DISABLED'); 
        });
        it('#23 | Zone CONFIRMER COURRIEL est invalide sans valeur quand notifier par courriel', () => {
          component.setNotification('pasnotification');
          let zone = component.problemeForm.get('telephone');
          expect(zone.status).toEqual('DISABLED'); 
        });
        it('#24 | Zone ADRESSE COURRIEL est invalide avec un format non conforme', () => {
          component.setNotification('pasnotification');
          let zone = component.problemeForm.get('telephone');
          expect(zone.status).toEqual('DISABLED'); 
        });
        it('#25 | Zone ADRESSE COURRIEL sans valeur et Zone CONFIRMER COURRIEL avec valeur valide retourne null', () => {
          component.setNotification('pasnotification');
          let zone = component.problemeForm.get('telephone');
          expect(zone.status).toEqual('DISABLED'); 
        });
        it('#26 | Zone ADRESSE COURRIEL avec valeur valide et Zone CONFIRMER COURRIEL sans valeur retourne null', () => {
          component.setNotification('pasnotification');
          let zone = component.problemeForm.get('telephone');
          expect(zone.status).toEqual('DISABLED'); 
        });
        it('#27 | Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont invalides si les valeurs sont différentes quand notifier par courriel', () => {
          component.setNotification('pasnotification');
          let zone = component.problemeForm.get('telephone');
          expect(zone.status).toEqual('DISABLED'); 
        });
        it('#28 | Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont valides si les valeurs sont identiques quand notifier par courriel', () => {
          component.setNotification('pasnotification');
          let zone = component.problemeForm.get('telephone');
          expect(zone.status).toEqual('DISABLED'); 
        });
});
