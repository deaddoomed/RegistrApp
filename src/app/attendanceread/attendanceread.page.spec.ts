import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AttendancereadPage } from './attendanceread.page';

describe('AttendancereadPage', () => {
  let component: AttendancereadPage;
  let fixture: ComponentFixture<AttendancereadPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AttendancereadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
