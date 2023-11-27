import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AttendanceCodePage } from './attendancecode.page';

describe('AttendanceCodePage', () => {
  let component: AttendanceCodePage;
  let fixture: ComponentFixture<AttendanceCodePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AttendanceCodePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
