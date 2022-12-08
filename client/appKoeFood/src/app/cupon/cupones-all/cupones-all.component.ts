import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatRadioChange } from '@angular/material/radio';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CartService } from 'src/app/share/cart.service';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService, TipoMessage } from 'src/app/share/notification.service';

@Component({
  selector: 'app-cupones-all',
  templateUrl: './cupones-all.component.html',
  styleUrls: ['./cupones-all.component.css']
})
export class CuponesAllComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  listOfCupones: any;
  datos: any;
  isUser: boolean;
  showFactura: boolean;
  loggedUser: any;
  typeOfPayment: any;
  carritoToSave: any;
  vuelto: any;
  paymentOptionEnum: any;
  noNumberCard: boolean = true;
  noDateCard: boolean = true;
  noCVV: boolean = true;
  incorrectCardNumber: boolean;
  incorrectCardDate: boolean;
  incorrectCVV: boolean;
  dataFacturaTable = new MatTableDataSource<any>();
  lineasDetalle: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService,
    private cartService: CartService,
    private notificacion: NotificacionService
  ) {
    this.typeOfPayment = 0

    this.carritoToSave = {}
    this.carritoToSave.clientPaymentInCard = 0
    this.carritoToSave.clientPaymentInCash = 0
  }

  ngOnInit(): void {
    this.listaCupones()
    this.loggedUser = JSON.parse(window.localStorage.getItem('currentUser'));
    this.isUser = this.loggedUser.user.userType == "USER"
    this.carritoToSave = {}
  }

  displayedColumns3 = [
    'product',
    'cantidad',
    'subtotal'
  ];

  handleFacturaView() {
    this.showFactura = !this.showFactura;
  }

  generarFact(cupon) {
    this.typeOfPayment = 0
    console.log(cupon);
    this.getDataFacturaTable(cupon.OrderDetail)
    console.log(this.dataFacturaTable);

    var arregloFinal = []
    this.lineasDetalle.map(producto => {
      console.log(producto);
      var productToSave = { idProduct: producto.idItem, quantity: producto.cantidad, total: producto.subtotal, note: producto.note ? producto.note : "" }
      arregloFinal.push(productToSave)
    })
    
    this.vuelto = 0
    this.carritoToSave.subTotal = cupon?.subTotal;
    this.carritoToSave.iva = cupon?.iva;
    this.carritoToSave.clientPaymentInCash = 0;
    this.carritoToSave.clientPaymentInCard = 0;
    this.carritoToSave.orderTotal = cupon.total;
    this.carritoToSave.idUser = this.loggedUser.user.id;
    this.carritoToSave.idRestaurant = cupon.idRestaurant
    this.carritoToSave.state = "DELIVERED"
    this.carritoToSave.paymentOption = this.typeOfPayment == 0 ? "CASH" : this.typeOfPayment == 1 ? "CARD" : "BOTH"
    this.carritoToSave.OrderDetail = arregloFinal;

    console.log(this.carritoToSave);


    this.handleFacturaView()

  }

  onChange(event: MatRadioChange) {
    this.typeOfPayment = event.value;
    this.getPaymentOptionsEnum()
    if (this.typeOfPayment == 0) {
      //Pago en efectivo
      this.carritoToSave.clientPaymentInCard = 0
    } else if (this.typeOfPayment == 1) {
      //Pago en tarjeta
      this.vuelto = 0
      this.carritoToSave.clientPaymentInCard = this.carritoToSave.orderTotal
    } else if (this.typeOfPayment == 2) {
      //Pago en tarjeta y efectivo
    }
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

  getPayInCash(event: any) {
    var totalInCash = event.target.value
    if (parseFloat(totalInCash) >= this.carritoToSave.orderTotal) {
      this.vuelto = totalInCash - this.carritoToSave.orderTotal
      this.carritoToSave.clientPaymentInCash = this.carritoToSave.orderTotal
    } else {
      this.vuelto = 0
      this.carritoToSave.clientPaymentInCash = 0
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
      // this.vuelto = totalInCash - this.carritoToSave.orderTotal;
      // this.carritoToSave.clientPaymentInCash = this.carritoToSave.orderTotal;
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
    var totalInCash = event.target.value
    //console.log(totalInCash);
    if (totalInCash != "") {
      if (parseFloat(totalInCash) >= this.carritoToSave.orderTotal) {
        this.vuelto = totalInCash - this.carritoToSave.orderTotal
        this.carritoToSave.clientPaymentInCard = 0
      } else {
        this.carritoToSave.clientPaymentInCard = parseFloat(this.carritoToSave.orderTotal) - parseFloat(totalInCash)
        this.carritoToSave.clientPaymentInCash = parseFloat(totalInCash);
      }
    } else {
      this.vuelto = 0
      this.carritoToSave.clientPaymentInCard = parseFloat(this.carritoToSave.orderTotal)
      this.carritoToSave.clientPaymentInCash = 0
    }

  }

  getDataFacturaTable(data) {
    var newData = []
    console.log(data);
    data.map(linea => {
      var newLinea = {
        product: linea.OrderDetailProduct,
        idItem: linea.OrderDetailProduct.id,
        cantidad: linea.quantity,
        precio: linea.OrderDetailProduct.price,
        subtotal: linea.total,
        note: '',
      }
      newData.push(newLinea)
    })
    this.lineasDetalle = newData;
    this.dataFacturaTable = new MatTableDataSource(newData);
  }

  generarOrden() {
    var productos = this.cartService.getItems;


    if (this.typeOfPayment != 0) {
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

    if (this.typeOfPayment == 2) {
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
      this.typeOfPayment == 0 &&
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
    console.log("pasa", this.carritoToSave);
    this.gService
      .create('orders/createByUser', this.carritoToSave)
      .subscribe((respuesta: any) => {
        this.notificacion.mensaje('Orden',
          'Orden registrada',
          TipoMessage.success);
        this.cartService.deleteCart();
        console.log(respuesta);
      });
    this.router.navigate(['/home/inicio']);


  }

  getTotales() {
    var listWithTotals = []
    this.listOfCupones.map(cupon => {
      var subTotal = 0
      var iva = 0
      var total = 0
      var disccountTotal = 0
      var descuento = cupon.descuento / 100
      cupon.OrderDetail.map(producto => {
        subTotal += producto.total
      })

      iva = subTotal * 0.13
      disccountTotal = (subTotal + iva) * descuento
      total = (subTotal + iva) - disccountTotal
      console.log({ ...cupon, total: total, subTotal: subTotal, iva: iva, disccountTotal: disccountTotal });
      listWithTotals.push({ ...cupon, total: total, subTotal: subTotal, iva: iva, disccountTotal: disccountTotal })
    })

    this.listOfCupones = listWithTotals
  }

  listaCupones() {
    this.gService
      .list(`cupon`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.datos = data;
        this.listOfCupones = this.datos;
        console.log(this.listOfCupones);
        this.getTotales()
      });
  }

  crearOrden() {
    this.router.navigate(['/cupon/create'], {
      relativeTo: this.route,
    });
  }

  actualizarCupon(id: number) {
    console.log(id);
    this.router.navigate(['/cupon/update', id], {
      relativeTo: this.route,
    });
  }

  comprarCupon() {

  }

}
