import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTransferDialogComponent } from './new-transfer-dialog.component';

describe('NewTransferDialogComponent', () => {
  let component: NewTransferDialogComponent;
  let fixture: ComponentFixture<NewTransferDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTransferDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTransferDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
