import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DollartoayProvider } from '../../providers/dollartoay/dollartoay';
import 'rxjs/add/operator/map';
import { HistoricoProvider } from '../../providers/historico/historico';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
datos:any;
  constructor(public navCtrl: NavController, public DollarProvider:DollartoayProvider, public HistoricoProvider: HistoricoProvider ) {

  }

    ionViewDidLoad(){
      this.DollarProvider.ObtenerDatos() 
      .subscribe(
        (data)=>
        {
         
          
          console.log(data);this.datos=data;},
        (error)=>{console.log(error);}
      )
      console.log(this.datos);
      console.log("hola");


    
      
    }

}
