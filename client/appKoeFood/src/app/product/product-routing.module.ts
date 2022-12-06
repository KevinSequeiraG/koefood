import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductAdminComponent } from './product-admin/product-admin.component';
import { ProductAllComponent } from './product-all/product-all.component';
import { ProductForm } from './product-form/product-form.component';
import { ProductUserComponent } from './product-user/product-user.component';
import { ProductWaiterComponent } from './product-waiter/product-waiter.component';

const routes: Routes = [
  { path: 'product/productall', component: ProductAllComponent },
  { path: 'product/create', component: ProductForm },
  { path: 'product/update/:id', component: ProductForm },
  { path: 'product/listofproducts/:id', component: ProductUserComponent },
  {
    path: 'product/listofproducts/:idRes/:idTable',
    component: ProductWaiterComponent,
  },
  {
    path: 'product/listofproductsadmin/:idRes/:idTable',
    component: ProductAdminComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
