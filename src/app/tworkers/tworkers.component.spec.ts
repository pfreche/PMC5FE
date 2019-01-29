import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TworkersComponent } from './tworkers.component';

describe('TworkersComponent', () => {
  let component: TworkersComponent;
  let fixture: ComponentFixture<TworkersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TworkersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TworkersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
