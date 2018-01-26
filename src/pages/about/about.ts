import { Component , ViewChild} from '@angular/core';
import { NavController } from 'ionic-angular';
import { HistoricoProvider } from '../../providers/historico/historico';

import 'rxjs/Rx'; 

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
historias;
  constructor(public navCtrl: NavController, public historicoprovider:HistoricoProvider) {
    
    
    
  }

  ionViewDidLoad(){
    this.historicoprovider.getHistorico()
    .subscribe(
      (data)=>{console.log(data);this.historias=data;},
      (error)=>{console.log(error);}
    )
    console.log(this.historias);
    console.log("hola");
    

    
    
    
    
  }

}
