import { TestBed, ComponentFixture, getTestBed, async } from '@angular/core/testing';
import { HttpModule, ResponseOptions, Response, Http, BaseRequestOptions, XHRBackend } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ProductComponent } from './components/product/product.component';
import { DataService } from './services/data.service';

describe('App', () => {
/* Mock the ajax call to backend, use fake data for testing the component */
  let mockBackend: MockBackend;
	const fakeProducts = [
		{
			index: 0,
			isSale: true,
			isExclusive: false,
			price: "$18.88",
			productImage: "product-1.jpg",
			productName: "Striped shirt",
			size: ["XS", "S", "L", "XL"]
		},
		{
			index: 1,
			isSale: false,
			isExclusive: false,
			price: "$25.44",
			productImage: "product-2.jpg",
			productName: "Denim shirt",
			size: ["XS", "S"]
		}];

  const fakeSizes = ["XS", "S", "L", "XL"];

/* Initialize the testing component */
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
				AppComponent,
				ProductComponent
      ],
      providers: [
        DataService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          deps: [MockBackend, BaseRequestOptions],
          useFactory:
          (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
              return new Http(backend, defaultOptions);
          }
        }],
      imports: [
        HttpModule
        ]
      });
      TestBed.compileComponents();
  }));

/* Function for inserting backend data */
  function mockBackendFunctions(testBed: TestBed) {
    mockBackend = testBed.get(MockBackend);
    mockBackend.connections.subscribe(
      (connection: MockConnection) => {
				connection.mockRespond(new Response(
					new ResponseOptions({
						body: fakeProducts
					})
				));
       });
  }


  it('should work', () => {
    let fixture = TestBed.createComponent(AppComponent)
    expect(fixture.componentInstance instanceof AppComponent).toBe(true, 'should create AppComponent')
  });

  it('get all products from backend and generate correct sizes after calling ngOnInit', () => {
/* Initialize the component with fake backend data */
    let testBed = getTestBed();
    mockBackendFunctions(testBed);

    let fixture: ComponentFixture<AppComponent> = getTestBed().createComponent(AppComponent);
/* Call ngOnInit function and wait after the execution */
    fixture.componentInstance.ngOnInit();

    fixture.detectChanges();

    expect(fixture.componentInstance.products[0]).toBe(fakeProducts[0]);
    expect(fixture.componentInstance.products[1]).toBe(fakeProducts[1]);
    expect(fixture.componentInstance.productsFiltered[0]).toBe(fakeProducts[0]);
    expect(fixture.componentInstance.productsFiltered[1]).toBe(fakeProducts[1]);
    expect(fixture.componentInstance.sizeRange).toEqual(fakeSizes);

  });

  it('get the right products after clicking dropdown menu', () => {
    let testBed = getTestBed();
    mockBackendFunctions(testBed);

    let fixture: ComponentFixture<AppComponent> = getTestBed().createComponent(AppComponent);
    fixture.componentInstance.ngOnInit();

    fixture.detectChanges();

/* Choose the dropdown menu, set the checked value, when Stable, check the product filtered  */
    const select = fixture.debugElement.query(By.css('select')).nativeElement;
    select.value = select.options[3].value;

    select.dispatchEvent(new Event('change'));

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(select.nativeElement.value).toEqual('L');
      expect(fixture.componentInstance.productsFiltered[0]).toBe(fakeProducts[0]);
    });
  });

});
