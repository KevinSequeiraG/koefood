import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderAllComponent } from './order-all/order-all.component';

const routes: Routes = [ {path: 'order/orderall', component: OrderAllComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
