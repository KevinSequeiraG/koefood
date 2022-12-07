import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CuponRoutingModule } from './cupon-routing.module';
import { CuponesAllComponent } from './cupones-all/cupones-all.component';



@NgModule({
  declarations: [CuponesAllComponent],
  imports: [
    CommonModule,
    CuponRoutingModule
  ]
})
export class CuponModule { }
