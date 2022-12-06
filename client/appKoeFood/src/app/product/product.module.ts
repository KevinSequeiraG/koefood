import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductAllComponent } from './product-all/product-all.component';

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
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductForm } from './product-form/product-form.component';
import { ProductUserComponent } from './product-user/product-user.component';
import { ProductWaiterComponent } from './product-waiter/product-waiter.component';
import { ProductAdminComponent } from './product-admin/product-admin.component';


@NgModule({
  declarations: [
    ProductAllComponent,
    ProductDetailComponent,
    ProductForm,
    ProductUserComponent,
    ProductWaiterComponent,
    ProductAdminComponent,
  ],
  imports: [
    CommonModule,
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
    ProductRoutingModule,
  ],
})
export class ProductModule {}
