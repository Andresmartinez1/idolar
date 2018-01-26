import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import 'rxjs/add/operator/map';
import { map } from 'rxjs/operator/map';
import { HttpParams } from '@angular/common/http';

/*
  Generated class for the DollartoayProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DollartoayProvider {

  constructor(public http: HttpClient) {
    console.log('Hello DollartoayProvider Provider');
  }

  ObtenerDatos(){

    return this.http.get('https://s3.amazonaws.com/dolartoday/data.json')
    .map(res => res);
  }

}
