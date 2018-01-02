import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminShopConfigurationComponent } from './admin-shop-configuration.component';

describe('AdminShopConfigurationComponent', () => {
  let component: AdminShopConfigurationComponent;
  let fixture: ComponentFixture<AdminShopConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminShopConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminShopConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
