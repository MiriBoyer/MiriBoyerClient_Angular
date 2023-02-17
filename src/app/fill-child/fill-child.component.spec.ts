import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FillChildComponent } from './fill-child.component';

describe('FillChildComponent', () => {
  let component: FillChildComponent;
  let fixture: ComponentFixture<FillChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FillChildComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FillChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
