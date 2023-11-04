import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajeErrorComponent } from './mensaje-error.component';

describe('MensajeErrorComponent', () => {
  let component: MensajeErrorComponent;
  let fixture: ComponentFixture<MensajeErrorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MensajeErrorComponent]
    });
    fixture = TestBed.createComponent(MensajeErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
