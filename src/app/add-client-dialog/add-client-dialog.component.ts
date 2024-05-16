import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { ClientService } from '../Services/client.service';
import { CoreService } from '../core/core.service';
import { NgToastService } from 'ng-angular-popup';

declare var $: any;


@Component({
  selector: 'app-add-client-dialog',
  templateUrl: './add-client-dialog.component.html',
  styleUrls: ['./add-client-dialog.component.css'],
})
export class AddClientDialogComponent implements OnInit {
  ClientForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private dialogRef: MatDialogRef<AddClientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private coreService: CoreService,
    private toast: NgToastService
  ) {
    this.ClientForm = this.fb.group({
      nom: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(3)]], // Seuls les caractères alphabétiques sont autorisés
      prenom: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]], // Seuls les caractères alphabétiques sont autorisés
      telephone: ['', [Validators.required, Validators.pattern('[0-9]{8,10}')]], // Format numérique de 8 à 10 chiffres
      adresse: ['', [Validators.required, Validators.minLength(5)]], // Exiger une longueur
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.ClientForm.patchValue(this.data);

    // Surveillance des changements de valeur dans le champ de nom
    this.applyFirstLetterUppercaseValidation('nom');
    // Surveillance des changements de valeur dans le champ de prénom
    this.applyFirstLetterUppercaseValidation('prenom');
    // Surveillance des changements de valeur dans le champ d'adresse
    this.applyFirstLetterUppercaseValidation('adresse');
  }

  // Fonction pour appliquer la validation de la première lettre en majuscule
  applyFirstLetterUppercaseValidation(fieldName: string): void {
    const control = this.ClientForm.get(fieldName);
    if (control) {
      control.valueChanges.subscribe((value: string) => {
        // Convertir la première lettre en majuscule
        const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
        // Mettre à jour la valeur du champ avec la première lettre en majuscule
        control.setValue(capitalizedValue, { emitEvent: false });
      });
    }
  }

  onFormSubmit() {
    if (this.ClientForm.valid) {
      if (this.data) {
        this.clientService
          .updateClient(this.data.id, this.ClientForm.value)
          .subscribe({
            next: (val: any) => {
              this.toast.info({
                detail: 'Information',
                summary: 'Client modifié',
                sticky: false,
                duration : 5000,
              });
              this.dialogRef.close(true);
            },

            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this.clientService.ajouterClient(this.ClientForm.value).subscribe({
          next: (val: any) => {
            this.toast.success({ detail: 'Succés', summary: 'Client ajouté', duration:5000 });
            this.dialogRef.close(true);
          },
        });
      }
    } else {
      // Affichage d'un message d'erreur si le formulaire n'est pas valide
      this.toast.error({
        detail: 'Erreur',
        summary: "Le formulaire n'est pas valide.",
        duration: 5000
      });
    }
  }
}
