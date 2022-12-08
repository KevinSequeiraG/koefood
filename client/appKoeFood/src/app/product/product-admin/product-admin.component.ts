import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import {
  NotificacionService,
  TipoMessage,
} from 'src/app/share/notification.service';
import { FormsModule } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';

import { CartAdminService } from 'src/app/share/cart-admin.service';

@Component({
  selector: 'app-product-admin',
  templateUrl: './product-admin.component.html',
  styleUrls: ['./product-admin.component.css'],
})
export class ProductAdminComponent implements AfterViewInit {
  categoryList: any;
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  idRestaurant: any;
  idTable: any;
  dataSource = new MatTableDataSource<any>();
  restaurantInfo: any;
  dataCarritoTable = new MatTableDataSource<any>();
  showCarrito: boolean;
  showFactura: boolean;
  showNoteModal: boolean;
  carritoToSave: any;
  carritoData: any;
  todayDate: any;
  loggedUser: any;
  ordenState: any;
  typeOfPayment: any;
  dataFacturaTable = new MatTableDataSource<any>();
  vuelto: any;
  product: any;
  paymentOptionEnum: any;
  newCarritoTemp: any;
  newCarritoTemp2: any;
  respUpdate: any;
  paymentUserChoose: any = 'CASH';
  noNumberCard: boolean = true;
  noDateCard: boolean = true;
  noCVV: boolean = true;
  incorrectCardNumber: boolean;
  incorrectCardDate: boolean;
  incorrectCVV: boolean;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatPaginator) paginator2!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatSort) sort2!: MatSort;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService,
    private dialog: MatDialog,
    private cartService: CartAdminService,
    private notificacion: NotificacionService
  ) {
    this.listaCategorias();
    this.route.params.subscribe((params) => {
      this.idRestaurant = params['idRes']; //log the value of id
      this.idTable = params['idTable']; //log the value of id
    });
    this.showCarrito = false;
    this.typeOfPayment = 0;

    this.carritoData = {};
    this.carritoData.clientPaymentInCard = 0;
    this.carritoData.clientPaymentInCash = 0;
  }

  onChange(event: MatRadioChange) {
    this.typeOfPayment = event.value;
    this.getPaymentOptionsEnum();
    if (this.typeOfPayment == 0) {
      //Pago en efectivoTHIS
      this.paymentUserChoose = 'CASH';
      this.carritoData.clientPaymentInCard = 0;
    } else if (this.typeOfPayment == 1) {
      //Pago en tarjeta
      this.vuelto = 0;
      this.paymentUserChoose = 'CARD';
      this.carritoData.clientPaymentInCard = this.carritoData.orderTotal;
    } else if (this.typeOfPayment == 2) {
      //Pago en tarjeta y efectivo
      this.paymentUserChoose = 'BOTH';
    }
  }

  validarNum(event: any) {
    var x = event.value;
    console.log(event);
    console.log(x);
  }

  displayedColumns3 = ['product', 'cantidad', 'subtotal'];

  displayedColumns2 = ['product', 'cantidad', 'precio', 'subtotal', 'actions'];

  displayedColumns = [
    'name',
    'description',
    'price',
    'productToRestaurantProduct',
    'actions',
  ];

  handleCarritoView() {
    this.showCarrito = !this.showCarrito;
    this.updateTotals();
  }

  handleFacturaView() {
    this.showCarrito = false;
    this.showFactura = !this.showFactura;
    this.getDataFacturaTable();
    console.log(this.carritoData);
  }

  ngAfterViewInit(): void {
    this.vuelto = 0;

    this.todayDate = new Date();
    this.loggedUser = JSON.parse(window.localStorage.getItem('currentUser'));
    this.ordenState = 'INPROCESS';
    this.listaProductsByRestaurant(parseInt(this.idRestaurant));
    this.restaurantData(parseInt(this.idRestaurant));
    this.getDataCarritoTable();

    this.getDataFacturaTable();
    this.carritoData = {};
    this.carritoData.clientPaymentInCard = 0;
    this.carritoData.clientPaymentInCash = 0;
    this.carritoToSave = {};
    this.updateTotals();
    this.listaCategorias();
    console.log(this.loggedUser);
  }

  handleNoteModal(item: any) {
    this.product = item;
    console.log(item);

    this.showNoteModal = true;
  }

  closeNoteModal() {
    this.showNoteModal = false;
  }

  addCommentToProduct() {
    const input = document.getElementById(
      'comment-ta'
    ) as HTMLInputElement | null;

    if (input != null) {
      const value = input.value;
      this.cartService.addCommentToProduct(this.product, value, this.idTable);
      this.notificacion.mensaje(
        'Orden',
        'Nota agregada con éxito',
        TipoMessage.success
      );
      this.showNoteModal = false;
    }
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
    this.gService.get('restaurants/', id).subscribe((data: any) => {
      this.restaurantInfo = data;
      console.log(this.restaurantInfo);
    });
  }

  comprar(id: number) {
    this.gService
      .get('products', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        //Agregar videojuego obtenido del API al carrito
        this.cartService.addToCart(data, this.idTable);
        //Notificar al usuario
        this.notificacion.mensaje(
          'Orden',
          'Producto: ' + data.name + ' agregado a la orden',
          TipoMessage.success
        );
      });
    this.updateTotals();
  }

  eliminarOneFromItem(item: any) {
    this.cartService.removeOneFromProduct(item);
    // this.notificacion.mensaje(
    //   'Orden',
    //   'Cantidad de producto disminuida',
    //   TipoMessage.warning
    // );
    this.updateTotals();
  }

  eliminarItem(item: any) {
    this.cartService.removeFromCart(item, this.idTable);
    this.notificacion.mensaje(
      'Orden',
      'Producto eliminado',
      TipoMessage.warning
    );
    this.updateTotals();
  }

  getDataCarritoTable() {
    this.newCarritoTemp = [];
    this.cartService.currentDataCart$.subscribe((data) => {
      data.map((item) => {
        if (item.idTable == this.idTable) {
          this.newCarritoTemp.push(item);
        }
      });
      this.dataCarritoTable = new MatTableDataSource(this.newCarritoTemp);
      this.dataCarritoTable.sort = this.sort2;
      this.dataCarritoTable.paginator = this.paginator2;
    });
  }

  getTotalCarrito() {
    this.carritoData.subtotal = this.cartService.getTotal(this.idTable);
  }

  getIvaTotal() {
    this.carritoData.iva = this.carritoData.subtotal * 0.13;
  }

  getTotalOrder() {
    this.carritoData.orderTotal =
      this.carritoData.iva + this.carritoData.subtotal;
  }

  getPayInCash(event: any) {
    var totalInCash = event.target.value;
    if (parseFloat(totalInCash) >= this.carritoData.orderTotal) {
      this.vuelto = totalInCash - this.carritoData.orderTotal;
      this.carritoData.clientPaymentInCash = this.carritoData.orderTotal;
    } else {
      this.vuelto = 0;
      this.carritoData.clientPaymentInCash = 0;
    }
  }
  validateCardNumber(event: any) {
    var cardNumber = event.target.value;
    var regex =
      /^(?:4\d([\- ])?\d{6}\1\d{5}|(?:4\d{3}|5[1-5]\d{2}|6011)([\- ])?\d{4}\2\d{4}\2\d{4})$/;
    if (regex.test(`${cardNumber}`)) {
      this.noNumberCard = false;
      console.log('validooooooooooooooooo');
      this.incorrectCardNumber = false;
      // this.vuelto = totalInCash - this.carritoData.orderTotal;
      // this.carritoData.clientPaymentInCash = this.carritoData.orderTotal;
    } else {
      this.incorrectCardNumber = true;
      this.noNumberCard = false;
      console.log('ayudaaaaaaaaaaa');
    }
  }

  validateCardDate(event: any) {
    this.noDateCard = false;
    var cardDate = event.target.value;
    var fecha = new Date();
    var fechaC = new Date(cardDate);
    if (fechaC >= fecha) {
      this.incorrectCardDate = false;
    } else {
      this.incorrectCardDate = true;
    }
  }

  validateCVV(event: any) {
    this.noCVV = false;
    var CVV = event.target.value;

    if (CVV.length == '3') {
      this.incorrectCVV = false;
    } else {
      this.incorrectCVV = true;
    }
  }

  getPayInBoth(event: any) {
    var totalInCash = event.target.value;
    if (totalInCash != '') {
      if (parseFloat(totalInCash) >= this.carritoData.orderTotal) {
        this.vuelto = totalInCash - this.carritoData.orderTotal;
        this.carritoData.clientPaymentInCard = 0;
      } else {
        this.carritoData.clientPaymentInCard =
          parseFloat(this.carritoData.orderTotal) - parseFloat(totalInCash);
        this.carritoData.clientPaymentInCash = parseFloat(totalInCash);
      }
    } else {
      this.vuelto = 0;
      this.carritoData.clientPaymentInCard = parseFloat(
        this.carritoData.orderTotal
      );
      this.carritoData.clientPaymentInCash = 0;
    }
  }

  updateTotals() {
    this.getDataCarritoTable();
    this.getTotalCarrito();
    this.getIvaTotal();
    this.getTotalOrder();
  }

  getDataFacturaTable() {
    this.newCarritoTemp2 = [];
    this.cartService.currentDataCart$.subscribe((data) => {
      data.map((item) => {
        if (item.idTable == this.idTable) {
          this.newCarritoTemp2.push(item);
        }
      });
      this.dataFacturaTable = new MatTableDataSource(this.newCarritoTemp2);
      // this.dataFacturaTable = new MatTableDataSource(data);
    });
  }

  getPaymentOptionsEnum() {
    this.gService
      .list('paymentOption')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        //new var
        this.paymentOptionEnum = data;
        console.log(this.paymentOptionEnum);
      });
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
      this.listaProductsByRestaurant(parseInt(this.idRestaurant));
    } else {
      this.listaProductsByRestaurantAndCategory(input.value);
    }
  }
  listaProductsByRestaurantAndCategory(idCat: any) {
    this.gService
      .list(
        `products/restaurantandcat/${parseInt(this.idRestaurant) + '/' + idCat}`
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.datos = data;
        this.dataSource = new MatTableDataSource(this.datos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }
  updateMesaSetFree(idT: number) {
    this.gService
      .updateState('restauranttables/updateStateSetFree', idT)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        //Obtener respuesta
        this.respUpdate = data;
      });
  }

  generarOrden() {
    var productos = this.cartService.getItems;

    var arregloFinal = [];
    productos.map((producto) => {
      console.log(this.idTable);
      if (producto.idTable == this.idTable) {
        var productToSave = {
          idProduct: producto.idItem,
          quantity: producto.cantidad,
          total: producto.subtotal,
          note: producto.note ? producto.note : '',
        };
        arregloFinal.push(productToSave);
      }
    });

    this.carritoToSave.subTotal = this.carritoData?.subtotal;
    this.carritoToSave.iva = this.carritoData.iva;
    this.carritoToSave.clientPaymentInCash =
      this.carritoData?.clientPaymentInCash;
    this.carritoToSave.clientPaymentInCard =
      this.carritoData?.clientPaymentInCard;
    this.carritoToSave.orderTotal = this.carritoData.orderTotal;
    this.carritoToSave.idUser = this.loggedUser.user.id;
    this.carritoToSave.idRestaurant = this.restaurantInfo.id;
    this.carritoToSave.state = 'REGISTERED';
    this.carritoToSave.paymentOption = this.paymentUserChoose;
    this.carritoToSave.OrderDetail = arregloFinal;
    this.carritoToSave.idTable = parseInt(this.idTable);

    if (this.paymentUserChoose == 'CARD' || this.paymentUserChoose == 'BOTH') {
      //VALIDAR TARJETA
      if (this.noNumberCard) {
        this.notificacion.mensaje(
          'Orden',
          'Debe ingresar una tarjeta',
          TipoMessage.error
        );
        return;
      }
      if (this.incorrectCardNumber) {
        this.notificacion.mensaje(
          'Orden',
          'Número de tarjeta incorrecto',
          TipoMessage.error
        );
        return;
      }
      if (this.noDateCard) {
        this.notificacion.mensaje(
          'Orden',
          'Debe ingresar la fecha de vencimiento',
          TipoMessage.error
        );
        return;
      }
      if (this.incorrectCardDate) {
        this.notificacion.mensaje(
          'Orden',
          'La tarjeta está vencida',
          TipoMessage.error
        );
        return;
      }

      // validar campo cvv
      if (this.noCVV) {
        this.notificacion.mensaje(
          'Orden',
          'Debe ingresar el cvv',
          TipoMessage.error
        );
        return;
      }
      if (this.incorrectCVV) {
        this.notificacion.mensaje('Orden', 'Cvv incorrecto', TipoMessage.error);
        return;
      }
    }

    if (this.paymentUserChoose == 'BOTH') {
      if (this.carritoToSave.clientPaymentInCash == 0) {
        this.notificacion.mensaje(
          'Orden',
          'Debe ingresar el monto correspondiente',
          TipoMessage.error
        );
        return;
      }
    }
    if (
      this.paymentUserChoose == 'CASH' &&
      this.carritoToSave.clientPaymentInCash == 0
    ) {
      this.notificacion.mensaje(
        'Orden',
        'Debe ingresar el monto correspondiente',
        TipoMessage.error
      );
      return;
    }

    //Si pagaron
    this.updateMesaSetFree(this.idTable);
    this.gService
      .create('orders/createByWaiter', this.carritoToSave)
      .subscribe((respuesta: any) => {
        this.notificacion.mensaje(
          'Orden',
          'Orden registrada',
          TipoMessage.success
        );
        this.cartService.deleteCart(this.idTable);
        console.log(respuesta);
      });
    this.router.navigate(['/restaurant/tables/admin']);
  }
}
