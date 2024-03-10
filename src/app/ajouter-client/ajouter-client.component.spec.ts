import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterClientComponent } from './ajouter-client.component';

describe('AjouterClientComponent', () => {
  let component: AjouterClientComponent;
  let fixture: ComponentFixture<AjouterClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjouterClientComponent]
    });
    fixture = TestBed.createComponent(AjouterClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
