import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserinfoPage } from './userinfo.page';

describe('UserinfoPage', () => {
  let component: UserinfoPage;
  let fixture: ComponentFixture<UserinfoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UserinfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
