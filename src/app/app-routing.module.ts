import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthentificationComponent } from './authentification/authentification.component';
import { MenusidebarComponent } from './menusidebar/menusidebar.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { GestionClientsComponent } from './Contacts/gestion-clients.component';
import { ProspectsComponent } from './prospects/prospects.component';




const routes: Routes = [
  
    {path: 'login', component: AuthentificationComponent},
    {path: 'footer', component:FooterComponent},
    {path: 'navbar', component:NavBarComponent},
    {path: 'sidebar', component:MenusidebarComponent},
    {path: 'contact', component:GestionClientsComponent},
    {path: 'prospect', component:ProspectsComponent}
    
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
