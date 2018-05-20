import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ProductComponent } from './product.component';

describe('ProductComponent', () => {
/* Initial the testing component, provide fake data for rendering */
  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;
  const fakeProduct =
		{
			index: 0,
			isSale: true,
			isExclusive: false,
			price: "$18.88",
			productImage: "product-1.jpg",
			productName: "Striped shirt",
			size: null
		};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductComponent, TestHostComponent]
    });
    TestBed.compileComponents();
  }));

/* Mock the parent component */
  beforeEach(() => {
    testHostFixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = testHostFixture.componentInstance;
  });

  it('should show correct product information according to input product object', () => {
/* Feed the testing component with fake data */
    testHostComponent.ProductComponent.product = fakeProduct;
    testHostFixture.detectChanges();
    expect(testHostFixture.nativeElement.querySelector('h4').innerText).toEqual("Striped shirt");
    expect(testHostFixture.nativeElement.querySelector('h3').innerText).toEqual("$18.88");
    expect(testHostFixture.debugElement.query(By.css('.saleBtn'))).toBeTruthy();
    expect(testHostFixture.debugElement.query(By.css('.ExclusiveBtn'))).toBeNull();
  });

  @Component({
    selector: `host-component`,
    template: `<app-product></app-product>`
  })
  class TestHostComponent {
    @ViewChild(ProductComponent)
    public ProductComponent: ProductComponent;
  }
});
