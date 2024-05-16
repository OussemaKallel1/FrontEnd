import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProspectService } from '../Services/Prospect.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

declare var $: any;

@Component({
  selector: 'app-add-prospect-dialog',
  templateUrl: './add-prospect-dialog.component.html',
  styleUrls: ['./add-prospect-dialog.component.css']
})
export class AddProspectDialogComponent implements OnInit{
  ProspectForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private prospectService: ProspectService,
    private dialogRef: MatDialogRef<AddProspectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private coreService: CoreService
  ) {
    this.ProspectForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      telephone: ['', Validators.required],
      adresse: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.ProspectForm.patchValue(this.data);
  }


  onFormSubmit() {
    if (this.ProspectForm.valid) {
      if (this.data) {
        this.prospectService
          .updateProspect(this.data.id, this.ProspectForm.value)
          .subscribe({
            next: (val: any) => {
              this.coreService.openSnackBar('Prospect modifié');
              this.dialogRef.close(true);
            },

            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this.prospectService.ajouterProspect(this.ProspectForm.value).subscribe({
          next: (val: any) => {
            this.coreService.openSnackBar('Prospect ajouté avec succèes');
            this.dialogRef.close(true);
          },

          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }


}
