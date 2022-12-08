import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CuponRoutingModule } from './cupon-routing.module';
import { CuponesAllComponent } from './cupones-all/cupones-all.component';
import { CuponesForm } from './cupones-form/cupones-form.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
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
import { ProductRoutingModule } from '../product/product-routing.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [CuponesAllComponent, CuponesForm],
  imports: [
    CommonModule,
    CuponRoutingModule,
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
  ]
})
export class CuponModule { }
