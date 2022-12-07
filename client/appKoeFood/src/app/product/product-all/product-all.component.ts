// import { AfterViewInit, Component, ViewChild } from '@angular/core';
// import { MatPaginator } from '@angular/material/paginator';
// import { MatSort } from '@angular/material/sort';
// import { MatTable } from '@angular/material/table';
// import { ProductAllDataSource } from './product-all-datasource';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProductDetailComponent } from '../product-detail/product-detail.component';

@Component({
  selector: 'app-product-all',
  templateUrl: './product-all.component.html',
  styleUrls: ['./product-all.component.css'],
})
export class ProductAllComponent implements AfterViewInit {
  datos: any;
  categoryList: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService,
    private dialog: MatDialog
  ) {
    this.listaCategorias();
  }

  displayedColumns = [
    'name',
    'description',
    'price',
    'productToRestaurantProduct',
    'state',
    'actions',
  ];

  ngAfterViewInit(): void {
    this.listaProducts();
    this.listaCategorias();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  listaCategorias() {
    this.categoryList = null;
    this.gService
      .list('productCategory')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.categoryList = data;
      });
  }
  changeRes() {
    const input = document.getElementById(
      'category-select'
    ) as HTMLSelectElement;
    if (parseInt(input.value) == 0) {
      this.listaProducts();
    } else {
      this.listaProductsByRestaurantAndCategory(input.value);
    }
  }
  listaProductsByRestaurantAndCategory(idCat: any) {
    this.gService
      .list(`products/restaurantandcatadmin/${idCat}`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.datos = data;
        this.dataSource = new MatTableDataSource(this.datos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  listaProducts() {
    this.gService
      .list('products/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.datos = data;
        this.dataSource = new MatTableDataSource(this.datos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  detailProduct(id: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.data = {
      id: id,
    };
    this.dialog.open(ProductDetailComponent, dialogConfig);
  }

  crearProduct() {
    this.router.navigate(['/product/create'], {
      relativeTo: this.route,
    });
  }

  activarProducto(id: any) {
    this.gService
      .get('products/updatestateactive', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        //Obtener respuesta
        console.log(data);
        this.listaProducts();
      });
  }

  desactivarProducto(id: any) {
    this.gService
      .get('products/updatestateinactive', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        //Obtener respuesta
        console.log(data);
        this.listaProducts();
      });
  }

  actualizarProduct(id: number) {
    console.log(id);
    this.router.navigate(['/product/update', id], {
      relativeTo: this.route,
    });
  }
}
