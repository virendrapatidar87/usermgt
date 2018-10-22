import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTipsComponent } from './manage-tips.component';

describe('ManageTipsComponent', () => {
  let component: ManageTipsComponent;
  let fixture: ComponentFixture<ManageTipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageTipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageTipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
