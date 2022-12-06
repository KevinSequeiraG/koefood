import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantTablesAdminComponent } from './restaurant-tables-admin/restaurant-tables-admin.component';
import { RestaurantTablesWaiterComponent } from './restaurant-tables-waiter/restaurant-tables-waiter.component';
import { RestaurantTablesComponent } from './restaurant-tables/restaurant-tables.component';
import { RestaurantTableForm } from './restauranttable-form/restauranttable-form.component';

const routes: Routes = [
  { path: 'restaurant/tables', component: RestaurantTablesComponent },
  {
    path: 'restaurant/tables/waiter',
    component: RestaurantTablesWaiterComponent,
  },
  {
    path: 'restaurant/tables/admin',
    component: RestaurantTablesAdminComponent,
  },
  { path: 'restauranttable/create', component: RestaurantTableForm },
  { path: 'restauranttable/update/:id', component: RestaurantTableForm },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestaurantRoutingModule {}
