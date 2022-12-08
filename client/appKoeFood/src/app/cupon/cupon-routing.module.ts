import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CuponesAllComponent } from './cupones-all/cupones-all.component';
import { CuponesForm } from './cupones-form/cupones-form.component';


const routes: Routes = [
  { path: 'cupon/cuponall', component: CuponesAllComponent },
  { path: 'cupon/create', component: CuponesForm },
  { path: 'cupon/update/:id', component: CuponesForm },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CuponRoutingModule { }
