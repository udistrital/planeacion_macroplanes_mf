import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarDialogComponent } from './consultar-dialog.component';

describe('ConsultarDialogPedComponent', () => {
  let component: ConsultarDialogComponent;
  let fixture: ComponentFixture<ConsultarDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultarDialogComponent]
    });
    fixture = TestBed.createComponent(ConsultarDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
