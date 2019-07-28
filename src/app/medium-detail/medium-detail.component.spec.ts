import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediumDetailComponent } from './medium-detail.component';

describe('MediumDetailComponent', () => {
  let component: MediumDetailComponent;
  let fixture: ComponentFixture<MediumDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediumDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediumDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
