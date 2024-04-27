import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguimientoPmeeComponent } from './seguimiento-pmee.component';

describe('SeguimientoPmeeComponent', () => {
  let component: SeguimientoPmeeComponent;
  let fixture: ComponentFixture<SeguimientoPmeeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeguimientoPmeeComponent]
    });
    fixture = TestBed.createComponent(SeguimientoPmeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
