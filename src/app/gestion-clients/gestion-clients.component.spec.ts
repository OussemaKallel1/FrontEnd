import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionClientsComponent } from './gestion-clients.component';

describe('GestionClientsComponent', () => {
  let component: GestionClientsComponent;
  let fixture: ComponentFixture<GestionClientsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionClientsComponent]
    });
    fixture = TestBed.createComponent(GestionClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
