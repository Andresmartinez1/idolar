import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HistoricoProvider } from '../../providers/historico/historico';

import 'rxjs/Rx';
import { parseDate } from 'ionic-angular/util/datetime-util';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  historias;
  constructor(public navCtrl: NavController, public historicoprovider: HistoricoProvider) {



  }

  ionViewDidLoad() {
    this.historicoprovider.getHistorico()
      .subscribe(
        (data) => {
          var temp = [];
          temp = data;
          for (var i = 0; i < data.length; i++) {

            temp[i].Fecha = new Date(temp[i].Fecha).toLocaleDateString();

            if (i < data.length - 1) {
              var precio_actual = Number(temp[i].Valor);
              var precio_anterior = Number(temp[i + 1].Valor);
              console.log(precio_actual + "  " + precio_anterior);
              var porcentaje = (((precio_actual - precio_anterior) / precio_anterior) * 100);
              temp[i + 1].porcentaje = porcentaje;
              if (porcentaje < 0) {
                porcentaje = porcentaje * (-1);
              }

              if (porcentaje == 0) {
                temp[i + 1].porcentajeMostrar = porcentaje.toFixed(0);
              } else
                temp[i + 1].porcentajeMostrar = porcentaje.toFixed(2);

            }

          }
          for (i = 0; i < temp.length; i++) {
            temp[i].Valor = (parseInt(temp[i].Valor) / 1000).toFixed(2);
          }
          temp.reverse();
          console.log(data); this.historias = temp;
        },
        (error) => { console.log(error); }
      )
    console.log(this.historias);
    console.log("hola");






  }

}
