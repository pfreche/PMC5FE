import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MfilesComponent } from './mfiles.component';

describe('MfilesComponent', () => {
  let component: MfilesComponent;
  let fixture: ComponentFixture<MfilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MfilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
