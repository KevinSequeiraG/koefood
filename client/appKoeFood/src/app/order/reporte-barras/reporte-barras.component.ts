import { AfterViewInit, Component, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-reporte-barras',
  templateUrl: './reporte-barras.component.html',
  styleUrls: ['./reporte-barras.component.css'],
})
export class ReporteBarrasComponent implements AfterViewInit {
  //Canvas para el grafico
  canvas: any;
  //Contexto del Canvas
  ctx: any;
  //Elemento html del Canvas
  @ViewChild('graficoCanvas') graficoCanvas!: { nativeElement: any };
  //Establecer gráfico
  grafico: any;
  //Datos para mostrar en el gráfico
  datos: any;
  //Lista de meses para filtrar el gráfico
  mesList: any;
  //Mes actual
  filtroFechaI: any;
  filtroFechaF: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private gService: GenericService) {}

  changeRes() {
    this.inicioGrafico();
  }
  ngAfterViewInit(): void {
    this.inicioGrafico();
  }
  inicioGrafico() {
    const input = document.getElementById('pay-select') as HTMLSelectElement;
    this.filtroFechaI = document.getElementById('filtroFechaI');

    this.filtroFechaF = document.getElementById('filtroFechaF');

    if (this.filtroFechaI.value && this.filtroFechaF.value) {
      //Obtener información del API
      console.log(this.filtroFechaI.value.toString());
      this.gService
        .getTP(
          'orders/vTotalTP',
          this.filtroFechaI.value.toString(),
          this.filtroFechaF.value.toString(),
          input.selectedIndex
        )
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          this.datos = data;
          console.log(data);
          this.graficoBrowser();
        });
    } else {
      this.gService
        .get('orders/vTotalTPDefault', input.selectedIndex)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          this.datos = data;
          console.log(data);
          this.graficoBrowser();
        });
    }
  }
  //Configurar y crear gráfico
  graficoBrowser(): void {
    this.canvas = this.graficoCanvas.nativeElement;
    this.ctx = this.canvas.getContext('2d');
    //Si existe destruir el Canvas para mostrar el grafico
    if (this.grafico) {
      this.grafico.destroy();
    }
    this.grafico = new Chart(this.ctx, {
      type: 'bar',
      data: {
        //Etiquetas del grafico, debe ser un array
        labels: this.datos.map((x) => x.paymentOption),
        datasets: [
          {
            label: 'Ventas por tipo de pago y fechas',
            backgroundColor: [
              '#2ecc71',
              '#3498db',
              '#95a5a6',
              '#9b59b6',
              '#f1c40f',
              '#e74c3c',
            ],
            //Datos del grafico, debe ser un array
            data: this.datos.map((x) => x.Total),
          },
        ],
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
      },
    });
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Desinscribirse
    this.destroy$.unsubscribe();
  }
}
