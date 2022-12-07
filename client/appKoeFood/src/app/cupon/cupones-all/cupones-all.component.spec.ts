import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuponesAllComponent } from './cupones-all.component';

describe('CuponesAllComponent', () => {
  let component: CuponesAllComponent;
  let fixture: ComponentFixture<CuponesAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuponesAllComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CuponesAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
