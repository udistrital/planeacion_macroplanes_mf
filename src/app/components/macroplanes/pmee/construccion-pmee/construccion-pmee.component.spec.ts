import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstruccionPmeeComponent } from './construccion-pmee.component';

describe('ConstruccionPmeeComponent', () => {
  let component: ConstruccionPmeeComponent;
  let fixture: ComponentFixture<ConstruccionPmeeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConstruccionPmeeComponent]
    });
    fixture = TestBed.createComponent(ConstruccionPmeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
