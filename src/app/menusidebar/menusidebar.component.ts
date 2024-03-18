import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menusidebar',
  templateUrl: './menusidebar.component.html',
  styleUrls: ['./menusidebar.component.css']
})
export class MenusidebarComponent {

  constructor(private router : Router){}

  isMenuClosed: boolean = true;

  toggleMenu() {
    this.isMenuClosed = !this.isMenuClosed;
  }
  
}
