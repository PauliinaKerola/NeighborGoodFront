import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemMapComponent } from './item-map.component';

describe('ItemMapComponent', () => {
  let component: ItemMapComponent;
  let fixture: ComponentFixture<ItemMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});