import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantTablesComponent } from './restaurant-tables/restaurant-tables.component';
import { RestaurantTableForm } from './restauranttable-form/restauranttable-form.component';

const routes: Routes = [
  { path: 'restaurant/tables', component: RestaurantTablesComponent },
  { path: 'restauranttable/create', component: RestaurantTableForm },
  { path: 'restauranttable/update/:id', component: RestaurantTableForm },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class RestaurantRoutingModule { }
