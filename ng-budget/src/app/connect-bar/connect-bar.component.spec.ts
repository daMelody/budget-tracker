import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectBarComponent } from './connect-bar.component';

describe('ConnectBarComponent', () => {
  let component: ConnectBarComponent;
  let fixture: ComponentFixture<ConnectBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
