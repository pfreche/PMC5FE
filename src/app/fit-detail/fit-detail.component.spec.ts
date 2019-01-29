import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FitDetailComponent } from './fit-detail.component';

describe('FitDetailComponent', () => {
  let component: FitDetailComponent;
  let fixture: ComponentFixture<FitDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FitDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FitDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
