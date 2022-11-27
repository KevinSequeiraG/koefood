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
import { CartService } from 'src/app/share/cart.service';
import { NotificacionService, TipoMessage } from 'src/app/share/notification.service';
import { FormsModule } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'app-product-user',
  templateUrl: './product-user.component.html',
  styleUrls: ['./product-user.component.css'],
})
export class ProductUserComponent implements AfterViewInit {
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  idRestaurant: any
  dataSource = new MatTableDataSource<any>();
  restaurantInfo: any;
  dataCarritoTable = new MatTableDataSource<any>();
  showCarrito: boolean;
  carritoToSave: any;
  carritoData: any;
  todayDate: any;
  loggedUser: any;
  ordenState: any;
  typeOfPayment: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService,
    private dialog: MatDialog,
    private cartService: CartService,
    private notificacion: NotificacionService,
  ) {
    this.route.params.subscribe(params => {
      this.idRestaurant = params['id'] //log the value of id
    });
    this.showCarrito = false;
  }

  onChange(event: MatRadioChange) {
    this.typeOfPayment = event.value;
  }

  displayedColumns2 = [
    'product',
    'cantidad',
    'precio',
    'subtotal',
    'actions'
  ];

  displayedColumns = [
    'name',
    'description',
    'price',
    'productToRestaurantProduct',
    'actions',
  ];

  handleCarritoView() {
    this.showCarrito = !this.showCarrito;
    console.log("pr", this.carritoToSave);
    console.log("carro", this.carritoData[0]);
  }

  ngAfterViewInit(): void {
    this.typeOfPayment = "CASH"
    this.todayDate = new Date()
    this.loggedUser = JSON.parse(window.localStorage.getItem('currentUser'));
    this.ordenState = 'INPROCESS'
    this.listaProductsByRestaurant(parseInt(this.idRestaurant))
    this.restaurantData(parseInt(this.idRestaurant))
    this.getDataCarritoTable()
    this.updateTotals()
    this.carritoToSave = { subTotal: this.carritoData[0]?.subtotal, iva: 0.13, clientPaymentInCash: 0, clientPaymentInCard: 0, orderTotal: 0, idUser: 1234567, idRestaurant: 1, state: "REGISTERED", paymentOption: "CASH", OrderDetail: [{ idProduct: 0, quantity: 0, total: 1, note: "sin lechuga" }] }
  }

  listaProducts() {
    this.gService
      .list('products')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.datos = data;
        this.dataSource = new MatTableDataSource(this.datos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  listaProductsByRestaurant(id: any) {
    this.gService
      .list(`products/restaurant/${id}`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
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

  actualizarProduct(id: number) {
    this.router.navigate(['/product/update', id], {
      relativeTo: this.route,
    });
  }

  restaurantData(id: number) {
    //this.listaRestaurantes = null;
    this.gService
      .get('restaurants/', id)
      .subscribe((data: any) => {
        this.restaurantInfo = data;
      });
  }

  comprar(id: number) {
    this.gService
      .get('products', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        //Agregar videojuego obtenido del API al carrito
        this.cartService.addToCart(data);
        //Notificar al usuario
        this.notificacion.mensaje(
          'Orden',
          'Producto: ' + data.name + ' agregado a la orden',
          TipoMessage.success
        );
      });
    this.updateTotals()
  }

  eliminarOneFromItem(item: any) {
    this.cartService.removeOneFromProduct(item);
    this.notificacion.mensaje('Orden',
      'Cantidad de producto disminuida',
      TipoMessage.warning);
    this.updateTotals()
  }

  eliminarItem(item: any) {
    this.cartService.removeFromCart(item);
    this.notificacion.mensaje('Orden',
      'Producto eliminado',
      TipoMessage.warning);
    this.updateTotals()
  }

  getDataCarritoTable() {
    this.cartService.currentDataCart$.subscribe(data => {
      this.dataCarritoTable = new MatTableDataSource(data);
      this.carritoData = data;
    })
  }

  getTotalCarrito() {
    this.carritoData.subtotal = this.cartService.getTotal()
  }

  getIvaTotal() {
    this.carritoData.iva = this.carritoData.subtotal * 0.13
  }

  getTotalOrder() {
    this.carritoData.orderTotal = this.carritoData.iva + this.carritoData.subtotal
  }

  updateTotals() {
    this.getDataCarritoTable()
    this.getTotalCarrito()
    this.getIvaTotal()
    this.getTotalOrder()
  }
}
