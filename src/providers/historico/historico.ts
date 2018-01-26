import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {AngularFireDatabaseModule} from 'angularfire2/database';
/*
  Generated class for the HistoricoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HistoricoProvider {

  constructor(public http: HttpClient, public afDB: AngularFireDatabase) {
    console.log('Hello HistoricoProvider Provider');
  }

  getHistorico(){
  return this.afDB.list('historico').valueChanges();


  }
  getValores(){
    return this.afDB.list('historico').valueChanges();
   
  
  
    }

}


