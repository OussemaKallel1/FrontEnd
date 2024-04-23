import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../Services/user.service';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css'],
})
export class AuthentificationComponent implements OnInit {
  signUpForm: FormGroup;
  isSignDivVisiable: boolean = true;
  showPassword: boolean = false;
  
  

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private coreService: CoreService
  ) {
    this.signUpForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      prenom: ['', [Validators.required, Validators.minLength(3)]],
      mdp: ['', [Validators.required, Validators.minLength(8)]],
    });

    
  }

  basculerVisibiliteMotDePasse(): void {
    this.showPassword = !this.showPassword;
  }

  isPasswordVisible(): boolean {
    return this.showPassword;
  }

  ngOnInit(): void {}
  

  SignUp() {
    if (this.signUpForm.valid) {
      const userData = this.signUpForm.value;
      this.userService.createUser(userData).subscribe(
        (response) => {
          console.log('Utilisateur enregistré avec succès :', response);
          this.coreService.openSnackBar('Utilisateur enregistré avec succès');
          // Réinitialiser le formulaire après l'enregistrement réussi
          this.signUpForm.reset();
        },
        (error) => {
          
          console.error(
            "Erreur lors de l'enregistrement de l'utilisateur :",
            error
            
          );
        }
      );
    }
  }

  usernameSignIn : string =""
  passwordSignIn : string = ""

   login() {
    this.userService.verifyCredentials(this.usernameSignIn, this.passwordSignIn)
      .subscribe(
        user => {
          localStorage.setItem("user",JSON.stringify(user));
         
          console.log('Connexion réussie');
          this.router.navigate(['/client']);
          
        },
        error => {
          
          console.error('Erreur de connexion');
        }
      );
  }
}