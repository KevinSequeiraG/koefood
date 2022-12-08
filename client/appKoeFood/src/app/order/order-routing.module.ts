import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderAllComponent } from './order-all/order-all.component';
import { ReporteBarrasComponent } from './reporte-barras/reporte-barras.component';
import { ReporteGraficoComponent } from './reporte-grafico/reporte-grafico.component';
import { ReportePDFComponent } from './reporte-pdf/reporte-pdf.component';
import { ReporteWaiterComponent } from './reporte-waiter/reporte-waiter.component';

const routes: Routes = [
  { path: 'order/orderall', component: OrderAllComponent },
  {
    path: 'orden/rGrafico',
    component: ReporteGraficoComponent,
  },
  {
    path: 'orden/barras',
    component: ReporteBarrasComponent,
  },
  {
    path: 'orden/rPDF',
    component: ReportePDFComponent,
  },
  {
    path: 'orden/pdfWaiter',
    component: ReporteWaiterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderRoutingModule {}
