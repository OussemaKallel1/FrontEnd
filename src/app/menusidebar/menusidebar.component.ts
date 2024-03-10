import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-menusidebar',
  templateUrl: './menusidebar.component.html',
  styleUrls: ['./menusidebar.component.css']
})
export class MenusidebarComponent {



  isMenuClosed: boolean = true;

  toggleMenu() {
    this.isMenuClosed = !this.isMenuClosed;
  }
  
  
}
