import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarPiComponent } from './consultar-pi.component';

describe('ConsultarPiComponent', () => {
  let component: ConsultarPiComponent;
  let fixture: ComponentFixture<ConsultarPiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultarPiComponent]
    });
    fixture = TestBed.createComponent(ConsultarPiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
