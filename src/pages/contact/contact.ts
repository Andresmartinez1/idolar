import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ChartsModule } from 'ng2-charts';
import { HistoricoProvider } from '../../providers/historico/historico';
import {Observable} from 'rxjs/Observable';
import { Time } from '@angular/common/src/i18n/locale_data_api';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
interface historico{
  Valor:number;
  Fecha:Time;
  id?:number;
}

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
historico;
HistoricoitemRef$ :AngularFireList<any>;
HistoricoObservable: Observable<any[]>;
  constructor(public navCtrl: NavController, public historicoprovider:HistoricoProvider, public afDB: AngularFireDatabase) {

  }
 historias;
  ionViewDidLoad(){

    this.HistoricoitemRef$=this.afDB.list('historico', ref=> ref.orderByChild('Fecha'));
    
  this.HistoricoObservable=this.HistoricoitemRef$.valueChanges();   
    this.historico=this.HistoricoObservable;
  }

  

  
}
