import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecomndedProductsComponent } from './recomnded-products.component';

describe('RecomndedProductsComponent', () => {
  let component: RecomndedProductsComponent;
  let fixture: ComponentFixture<RecomndedProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecomndedProductsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecomndedProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
