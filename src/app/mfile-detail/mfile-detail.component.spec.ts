import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MfileDetailComponent } from './mfile-detail.component';

describe('MfileDetailComponent', () => {
  let component: MfileDetailComponent;
  let fixture: ComponentFixture<MfileDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MfileDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MfileDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
