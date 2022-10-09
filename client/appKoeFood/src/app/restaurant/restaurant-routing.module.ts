import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantTablesComponent } from './restaurant-tables/restaurant-tables.component';

const routes: Routes = [
  { path: 'restaurant/tables', component: RestaurantTablesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantRoutingModule { }
