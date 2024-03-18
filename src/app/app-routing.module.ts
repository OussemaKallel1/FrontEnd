import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthentificationComponent } from './authentification/authentification.component';
import { MenusidebarComponent } from './menusidebar/menusidebar.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { GestionClientsComponent } from './gestion-clients/gestion-clients.component';




const routes: Routes = [
  
    {path: 'login', component: AuthentificationComponent},
    {path: 'footer', component:FooterComponent},
    {path: 'navbar', component:NavBarComponent},
    {path: 'sidebar', component:MenusidebarComponent},
    {path: 'client', component:GestionClientsComponent}
    
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
