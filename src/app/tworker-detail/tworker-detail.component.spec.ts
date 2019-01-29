import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TworkerDetailComponent } from './tworker-detail.component';

describe('TworkerDetailComponent', () => {
  let component: TworkerDetailComponent;
  let fixture: ComponentFixture<TworkerDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TworkerDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TworkerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
