import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryIn } from './inventory-in';

describe('InventoryIn', () => {
  let component: InventoryIn;
  let fixture: ComponentFixture<InventoryIn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryIn],
    }).compileComponents();

    fixture = TestBed.createComponent(InventoryIn);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
