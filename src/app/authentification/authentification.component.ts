import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../Services/Auth.service';
import { CoreService } from '../core/core.service';


@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css'],
})
export class AuthentificationComponent implements OnInit {
  signUpForm: FormGroup;
  signInForm: FormGroup;
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

    this.signInForm = this.fb.group({
      un: ['', Validators.required],
      pass: ['', Validators.required],
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
      this.userService.SignUp(userData).subscribe(
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
          this.coreService.openSnackBar(
            "Erreur lors de l'enregistrement de l'utilisateur"
          );
        }
      );
    }
  }

  SignIn() {
    const { un, pass } = this.signInForm.value;
    this.userService.SignIn(un, pass).subscribe(
      (response: any) => {
        console.log(response);

        const accessToken = response['access_token'];
        localStorage.setItem('accessToken', accessToken);

        const jwtData = this.getDataFromJWTtoken();
        console.log('Données JWT :', jwtData);

        console.log('Utilisateur connecté');

        this.coreService.openSnackBar('Utilisateur connecté avec succès');
        this.router.navigate(['client']);
      },
      (error) => {
        console.error("Erreur lors de la connexion de l'utilisateur :", error);
        this.coreService.openSnackBar(
          "Vérifier le nom d'utilisateur ou le mot de passe"
        );
      }
    );
  }

  getDataFromJWTtoken() {
    const token = localStorage.getItem('accessToken') ?? '';
    if (token) {
      let jwtData = token.split('.')[1];
      let decodedJwtJsonData = window.atob(jwtData);
      let decodedJwtData = JSON.parse(decodedJwtJsonData);

      // Stockage des données dans le local storage
      localStorage.setItem('jwtData', JSON.stringify(decodedJwtData));

      return decodedJwtData;
    }
  }
}
