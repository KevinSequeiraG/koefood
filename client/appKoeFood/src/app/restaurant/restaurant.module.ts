import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestaurantRoutingModule } from './restaurant-routing.module';
import { RestaurantTablesComponent } from './restaurant-tables/restaurant-tables.component';
import { RestaurantTableDetailComponent } from './restauranttable-detail/restauranttable-detail.component';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { RestaurantTableForm } from './restauranttable-form/restauranttable-form.component';
import { RestaurantTablesWaiterComponent } from './restaurant-tables-waiter/restaurant-tables-waiter.component';
import { RestaurantTablesAdminComponent } from './restaurant-tables-admin/restaurant-tables-admin.component';

@NgModule({
  declarations: [
    RestaurantTablesComponent,
    RestaurantTableDetailComponent,
    RestaurantTableForm,
    RestaurantTablesWaiterComponent,
    RestaurantTablesAdminComponent,
  ],
  imports: [
    CommonModule,
    RestaurantRoutingModule,
    MatButtonToggleModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDividerModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule,
  ],
})
export class RestaurantModule {}
