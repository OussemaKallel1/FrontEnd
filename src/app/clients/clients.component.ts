import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  isAdding: boolean = false; // Indicateur si le formulaire d'ajout est ouvert ou non
  client: any = {}; // Client à ajouter

  constructor() { }

  ngOnInit(): void {
    // Initialisation
  }

  // Ouvrir le formulaire d'ajout
  openAddClientForm() {
    this.isAdding = true;
    this.client = {}; // Réinitialiser les données du client
  }

  // Ajouter un client
  onSubmit() {
    // Logique d'ajout du client
    // Exemple : service.addClient(this.client);
    
    // Réinitialiser le formulaire et fermer le formulaire d'ajout
    this.isAdding = false;
    this.client = {}; // Réinitialiser les données du client
  }
}