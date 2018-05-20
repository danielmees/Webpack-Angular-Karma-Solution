import { Component, OnInit } from '@angular/core'
import { DataService } from './services/data.service';
import '../assets/css/style.css'

@Component({
	selector: 'app',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.css' ]
})

export class AppComponent implements OnInit {
/* Define data for rendering the products and dropdown menu, product: initial data from Json file,
productsFiltered: Products according to dropdown menu, equals to initial data when page first loaded,
sizeRange: dropdown menu content, all sizes for Json file with removing duplicated ones  */
	products:Product[];
	productsFiltered:Product[];
  sizeRange:Array<string>;

	constructor(private dataService:DataService) {}
/* Intialize the data */
	ngOnInit() {
		this.dataService.getProducts().subscribe((products) => {
			this.products = products;
			this.productsFiltered = products;
			this.sizeRange = this.generateSizeRange(products);
	  });
	}

/* Get all sizes from Json file, remove duplicated ones  */
	generateSizeRange(products) {
		let sizeRange: Array<string> = [];
		products.forEach((product) => {
			product.size.forEach((size) => {
				if (typeof size !== "undefined" && sizeRange.indexOf(size) === -1)
					sizeRange.push(size);
			});
		});
		return sizeRange;
	}

/* Filter products according to dropdown menu change */
	selectChange(value) {
		this.productsFiltered = this.products.filter((product) =>
			product.size.indexOf(value) !== -1
		);
	}
}

/* define custom data type */
export interface Product {
	index: number,
	isSale: boolean,
	isExclusive: boolean,
	price: string,
	productImage: string,
	productName: string,
	size: Array<Size>
}

interface Size {
	size: string
}
