import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarPlanesComponent } from './consultar-planes.component';

describe('PedComponent', () => {
  let component: ConsultarPlanesComponent;
  let fixture: ComponentFixture<ConsultarPlanesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultarPlanesComponent]
    });
    fixture = TestBed.createComponent(ConsultarPlanesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
