import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UrlMatcherComponent } from './url-matcher.component';

describe('UrlMatcherComponent', () => {
  let component: UrlMatcherComponent;
  let fixture: ComponentFixture<UrlMatcherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UrlMatcherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UrlMatcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
