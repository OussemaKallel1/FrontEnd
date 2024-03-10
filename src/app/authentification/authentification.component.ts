import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent implements OnInit {
  

constructor(private fb:FormBuilder,private router : Router ){}

isSignDivVisiable: boolean  = true;
showPassword: boolean = false;
password: string = ''; // Déclaration de la variable password
username: string = '';
prenom: string = '';

basculerVisibiliteMotDePasse(): void {
  this.showPassword = !this.showPassword;
}

isPasswordVisible(): boolean {
  return this.showPassword;
}

  ngOnInit(): void {

    this.signUpForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      prenom: ['', [Validators.required, Validators.minLength(3)]],
      mdp: ['', [Validators.required, Validators.minLength(6)]]
    })
  }


  
 
  signUpForm!: FormGroup;

  errorMessage: string = '';
  successMessage: string = '';

  submitSignUpForm() {
    if (this.signUpForm.valid) {
      // Afficher un message de succès si le formulaire est valide
      this.successMessage = 'Le formulaire a été soumis avec succès.';
      this.errorMessage = ''; // Effacer le message d'erreur précédent
    } else {
      // Afficher un message d'erreur si le formulaire est invalide
      this.errorMessage = 'Veuillez remplir correctement tous les champs.';
      this.successMessage = ''; // Effacer le message de succès précédent
    }
  }
}
