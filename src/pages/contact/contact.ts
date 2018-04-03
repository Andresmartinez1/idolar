import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ChartsModule } from 'ng2-charts';
import { HistoricoProvider } from '../../providers/historico/historico';
import { Observable } from 'rxjs/Observable';
import { Time } from '@angular/common/src/i18n/locale_data_api';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Chart } from 'chart.js';

interface historico {
  Valor: number;
  Fecha: Time;
  id?: number;
}

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  historico;
  HistoricoitemRef$: AngularFireList<any>;
  HistoricoObservable: Observable<any[]>;
  historias = [];
  chart;
  fechas = ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"];
  valores = [12, 19, 3, 5, 2, 3];
  chartDonut;
  tendencia;
  contratendencia;

  constructor(public navCtrl: NavController, public historicoprovider: HistoricoProvider, public afDB: AngularFireDatabase) {
    this.getData();
    this.formatData();

  }

  ionViewDidLoad() {
    this.mostrargrafico();
    this.graficoDona();

  }

  ionViewWillEnter() {
    this.getData();
    this.formatData();
    this.mostrargrafico();
    this.graficoDona();
  }

  getData() {
    this.historicoprovider.getHistorico()
      .subscribe(
        (data) => {
          var temp = [];
          temp = data;
          var estadisticaNegativa = 0;
          var estadisticaNula = 0;
          var estadisticaPositiva = 0;
          for (var i = 0; i < data.length; i++) {
            temp[i].Fecha = new Date(temp[i].Fecha).toLocaleDateString();
            if (i < data.length - 1) {
              var precio_actual = Number(temp[i].Valor);
              var precio_anterior = Number(temp[i + 1].Valor);
              console.log(precio_actual + "  " + precio_anterior);
              var porcentaje = (((precio_actual - precio_anterior) / precio_anterior) * 100);
              if (porcentaje < 0) {
                estadisticaNegativa = estadisticaNegativa + 1;
                porcentaje = porcentaje * (-1);
              }
              if (porcentaje == 0) {
                estadisticaNula = estadisticaNula + 1;
                temp[i + 1].porcentajeMostrar = porcentaje.toFixed(0);
              } else
                temp[i + 1].porcentajeMostrar = porcentaje.toFixed(2);
            }
          }
          //Cacular estadistica
          estadisticaPositiva = (temp.length - 1) - (estadisticaNegativa + estadisticaNula);
          if (estadisticaNegativa > estadisticaPositiva && estadisticaNegativa > estadisticaNula) {

            var porcentajeTend = (estadisticaNegativa * 100) / (temp.length - 1);

            this.tendencia = porcentajeTend.toFixed(0);
            this.contratendencia = ((estadisticaPositiva + estadisticaNula) * 100) / (temp.length - 1);
            console.log('Tendencia a Subir', porcentajeTend);

          }
          if (estadisticaPositiva > estadisticaNegativa && estadisticaPositiva > estadisticaNula) {
            var porcentajeTend1 = (estadisticaPositiva * 100) / (temp.length - 1);
            console.log('tendencia a bajar');
          }
          if (estadisticaNula > estadisticaNegativa && estadisticaNula > estadisticaPositiva) {
            var porcentajeTend2 = (estadisticaNula * 100) / (temp.length - 1);
            console.log('Estable');
          }
          temp.reverse();
          console.log(data); this.historias = temp;
          console.log("Estadisticas: ", estadisticaNegativa, estadisticaNula, estadisticaPositiva)
        },
        (error) => { console.log(error); }
      )
    console.log(this.historias);
    console.log("hola");
  }

  formatData() {
    var fechas = [];
    var valores = [];
    console.log(this.historias.length);
    for (var i = 0; i < this.historias.length; i++) {
      fechas.push(this.historias[i].Fecha);
    }
    console.log(fechas);
    this.fechas = fechas;
    for (var i = 0; i < this.historias.length; i++) {
      var valor = this.historias[i].Valor;
      valores.push(parseInt(valor));
    }
    this.valores = valores;
    console.log(this.valores);
  }

  mostrargrafico() {
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: this.fechas,
        datasets: [
          {
            data: this.valores,
            borderColor: "#45B5AA",
            fill: false,
            fillColor: "rgba(255,255,255)",
            strokeColor: "rgba(255,255,255)",
            pointColor: "rgba(255,255,255)",
            pointStrokeColor: "#45B5AA",


          },
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: false
          }],
          yAxes: [{
            display: false
          }],
        }
      }
    });
  }

  graficoDona() {
    var data1 = {
      labels: ["match1"],
      datasets: [
        {
          label: "TeamA Score",
          data: [this.tendencia, this.contratendencia],
          backgroundColor: [
            "#00f2fe",
            "#e1e1e1",
            "#DC143C",
            "#F4A460",
            "#2E8B57"
          ],
          borderColor: [
            "#e1e1e1",
            " #e1e1e1",
            "#CB252B",
            "#E39371",
            "#1D7A46"
          ],
          borderWidth: [-3, -3]
        }
      ]
    };
    var options = {
      responsive: true,
      title: {
        display: false,
        position: "top",
        text: "Doughnut Chart",
        fontSize: 18,
        fontColor: "#111"
      },
      legend: {
        display: false,
        position: "bottom",
        labels: {
          fontColor: "#333",
          fontSize: 16
        }
      }
    };

    this.chartDonut = new Chart('canvasDonut', {
      type: 'doughnut',
      data: data1,
      options: options,

    });

  }
  mostrarUltimosDias() {
    var tempFecha = [];
    var tempValores = [];
    for (var i = 0; i < 7; i++) {
      tempFecha.push(this.fechas[i]);
      tempValores.push(this.valores[i]);
    }
    this.fechas = tempFecha;
    this.valores = tempValores;
    console.log(this.fechas);
    console.log(this.valores);
  }

}

