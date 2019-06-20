import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PicFullscreenComponent } from './pic-fullscreen.component';

describe('PicFullscreenComponent', () => {
  let component: PicFullscreenComponent;
  let fixture: ComponentFixture<PicFullscreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PicFullscreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PicFullscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
