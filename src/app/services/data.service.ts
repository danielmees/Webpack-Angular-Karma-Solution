import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {
  constructor(public http:Http) {
  }
/* Get data from Json file  */
  getProducts(){
    return this.http.get('http://localhost:8090/src/assets/products.json')
      .map(res => res.json());
  }

}
