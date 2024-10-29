import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EchenacesComponent } from './echenaces.component';

describe('EchenacesComponent', () => {
  let component: EchenacesComponent;
  let fixture: ComponentFixture<EchenacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EchenacesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EchenacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
