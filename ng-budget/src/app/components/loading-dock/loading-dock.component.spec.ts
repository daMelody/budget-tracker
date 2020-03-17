import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingDockComponent } from './loading-dock.component';

describe('LoadingDockComponent', () => {
  let component: LoadingDockComponent;
  let fixture: ComponentFixture<LoadingDockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingDockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingDockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
