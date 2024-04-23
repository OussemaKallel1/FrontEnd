import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ClientService, } from '../Services/client.service';
import { CoreService } from '../core/core.service';


declare var $: any;

@Component({
  selector: 'app-add-client-dialog',
  templateUrl: './add-client-dialog.component.html',
  styleUrls: ['./add-client-dialog.component.css']
})
export class AddClientDialogComponent implements OnInit {
ClientForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private dialogRef:MatDialogRef<AddClientDialogComponent>,
    @Inject(MAT_DIALOG_DATA)  public data: any,
    private coreService : CoreService
    ){


    this.ClientForm = this.fb.group({

    nom: ['', Validators.required],
    prenom: ['', Validators.required],
    telephone: ['', Validators.required],
    adresse: ['', Validators.required],
    genre: ['', Validators.required],
  })
}

ngOnInit(): void {
    this.ClientForm.patchValue(this.data);
}

onFormSubmit(){
  if (this.ClientForm.valid) {
    if(this.data) {
      this.clientService.updateClient(this.data.id ,this.ClientForm.value).subscribe({
        next: (val:any) => {
          this.coreService.openSnackBar('Client modifié');
          this.dialogRef.close(true);
    
        },
    
        error: (err:any) =>{
          console.error(err);
        },
       });

    } else {
      this.clientService.ajouterClient(this.ClientForm.value).subscribe({
    next: (val:any) => {
      this.coreService.openSnackBar('Client ajouté avec succèes');
      this.dialogRef.close(true);

    },

    error: (err:any) =>{
      console.error(err);
    },
   });
    }
   
  }
}


}