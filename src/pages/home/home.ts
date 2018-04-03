import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DollartoayProvider } from '../../providers/dollartoay/dollartoay';
import 'rxjs/add/operator/map';
import { HistoricoProvider } from '../../providers/historico/historico';
import { last } from 'rxjs/operators';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  datos: any;
  datos2;
  lastday;
  porcentaje;
  diferencia;
  constructor(public historicoprovider: HistoricoProvider, public navCtrl: NavController, public DollarProvider: DollartoayProvider, public HistoricoProvider: HistoricoProvider) {

  }

  ionViewDidLoad() {
    var Json;
    var ultimo;
    this.CargarDatos().then((data)=>{
      Json=data;
      this.obtenerUltimoDia().then((data2)=>{
        ultimo=data2;
      var precio_actual = Number(Json.USD.transferencia);
      var precio_anterior = Number(ultimo.Valor);
      console.log(precio_actual + "  " + precio_anterior);
      var porcentaje = ((precio_actual - precio_anterior) / precio_anterior) * 100;
      this.porcentaje = porcentaje;
      console.log(this.porcentaje);
      var precio_actual = Number(Json.USD.transferencia);
      var precio_anterior = Number(this.lastday.Valor);
      var diferencia = (precio_actual - precio_anterior);
      this.diferencia = diferencia;
      this.datos.USD.transferencia = (parseInt(this.datos.USD.transferencia) / 1000).toFixed(2);
      this.datos.EUR.transferencia = (parseInt(this.datos.EUR.transferencia) / 1000).toFixed();
      this.diferencia =(diferencia/1000).toFixed(2);
      this.porcentaje = porcentaje.toFixed(2);
      console.log(this.diferencia, this.porcentaje);

      })
    
    });
  }

  CargarDatos() {
    return new Promise((resolve, reject) => {
     this.DollarProvider.ObtenerDatos()
        .subscribe(
          (data) => {
            var temp;
            temp = data;
  
           
             this.datos = temp;
             resolve(temp);
          },
          (error) => { console.log(error); }
        );
   });
  }
  obtenerUltimoDia() {
    return new Promise((resolve, reject) => {
       this.historicoprovider.getHistorico()
        .subscribe(
          (data) => {
            var lastday;
            lastday = data[data.length - 1];
            console.log(lastday);
            this.lastday = lastday;
         
         resolve(lastday);
          },
          (error) => { console.log(error); }
        )
    });
  }


  obtenerPorcentaje() {
    return new Promise((resolve, reject) => {

    
      var precio_actual = Number(this.datos.USD.transferencia);
      var precio_anterior = Number(this.lastday.Valor);
      console.log(precio_actual + "  " + precio_anterior);
      var porcentaje = ((precio_actual - precio_anterior) / precio_anterior) * 100;
      this.porcentaje = porcentaje;
      console.log(porcentaje);
    });
  }
  obtenerDiferencia(precio) {
    return new Promise((resolve, reject) => {
      var precio_actual = Number(precio);
      var precio_anterior = Number(this.lastday.Valor);
      var diferencia = (precio_actual - precio_anterior);
      this.diferencia = diferencia;
      console.log(diferencia);
    });
  }

  Covertdatos() {

    this.datos.USD.transferencia = parseInt(this.datos.USD.transferencia) / 1000;


  }

}
