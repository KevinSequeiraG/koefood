import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService, TipoMessage } from 'src/app/share/notification.service';

@Component({
  selector: 'app-cupones-form',
  templateUrl: './cupones-form.component.html',
  styleUrls: ['./cupones-form.component.css']
})
export class CuponesForm implements OnInit {
  datos: any;
  titleForm: string = 'Crear';
  destroy$: Subject<boolean> = new Subject<boolean>();
  restaurantList: any;
  categoryList: any;
  productInfo: any;
  respProduct: any;
  submitted = false;
  productForm: FormGroup;
  idProduct: number = 0;
  isCreate: boolean = true;
  productsFromRestaurant = new MatTableDataSource<any>();
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  productsForCupon: any;

  constructor(private fb: FormBuilder, private gService: GenericService,
    private router: Router, private activeRouter: ActivatedRoute, private notificacion: NotificacionService) {
    this.formularioReactive();
    this.listaRestaurantes();
    this.listaCategorias();
  }
  ngOnInit(): void {
    this.productsForCupon = []
    //Verificar si se envio un id por parametro para crear formulario para actualizar
    this.activeRouter.params.subscribe((params: Params) => {
      this.idProduct = params['id'];
      console.log(this.idProduct);
      if (this.idProduct != undefined) {
        this.isCreate = false;
        this.titleForm = "Actualizar";
        //Obtener videojuego a actualizar del API
        this.gService.get('products', this.idProduct).pipe(takeUntil(this.destroy$))
          .subscribe((data: any) => {
            console.log(data);
            this.productInfo = data;
            console.log("info", this.productInfo);
            this.productForm.setValue({
              id: this.productInfo.id,
              name: this.productInfo.name,
              description: this.productInfo.description,
              ingredients: this.productInfo.ingredients,
              idCategory: this.productInfo.idCategory,
              disccount: this.productInfo.disccount,
              state: this.productInfo.state,
              idRestaurant: this.productInfo.idRestaurant,
              // generos:this.restaurantTableInfo.generos.map(({id}) => id)
            })
          });
      }
    });
  }

  saveCupon() {
    var cupon
    console.log(this.productInfo);
  }

  addLineaDetalle(producto: { id: any; price: number; }) {
    console.log(producto);
    var lineaDetalle = {}
    var isInCupon = false
    var positionOfProduct: number;
    if (this.productsForCupon?.length > 0) {
      this.productsForCupon.map((product: { idProduct: any; }, index: any) => {
        console.log(index);
        if (producto.id === product.idProduct) {
          isInCupon = true
          positionOfProduct = index;
        }
      })

      if (isInCupon) {
        //sumar cantidad del producto
        this.productsForCupon[positionOfProduct] = { idProduct: producto.id, quantity: this.productsForCupon[positionOfProduct].quantity + 1, total: (producto.price * (this.productsForCupon[positionOfProduct].quantity + 1)), note: '' }
      } else {
        //nuevo producto
        lineaDetalle = { idProduct: producto.id, quantity: 1, total: producto.price, note: '' }
        this.productsForCupon.push(lineaDetalle)
      }
    } else {
      //Se debe crear el producto en linea detalle con 1 en cantidad
      lineaDetalle = { idProduct: producto.id, quantity: 1, total: producto.price, note: '' }
      this.productsForCupon.push(lineaDetalle)
    }

    console.log(this.productsForCupon);
  }

  displayedColumns = [
    'name',
    'description',
    'price',
    'productToRestaurantProduct',
    'actions',
  ];

  select(restaurantId: any) {
    console.log(event);
    this.listaProductsByRestaurant(restaurantId);
  }

  //Crear Formulario
  formularioReactive() {
    //[null, Validators.required]
    // var totalOfTables = parseInt(window.localStorage.getItem("totalOfTables"))
    // var finalCode = "KOE-" + (totalOfTables + 1)
    this.productForm = this.fb.group({
      id: [null, null],
      name: [null, Validators.compose([
        Validators.required, Validators.maxLength(50)
      ])],
      description: [null, Validators.compose([
        Validators.required, Validators.maxLength(200)
      ])],
      ingredients: [null, Validators.required],
      idCategory: [null, Validators.required],
      disccount: [null, Validators.required],
      state: [true, Validators.required],
      idRestaurant: [null, Validators.required],
    });
  }

  listaRestaurantes() {
    this.restaurantList = null;
    this.gService
      .list('restaurants')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.restaurantList = data;
      });
  }

  listaProductsByRestaurant(id: any) {
    this.gService
      .list(`products/restaurant/${id}`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.datos = data;
        this.productsFromRestaurant = new MatTableDataSource(this.datos);
        this.productsFromRestaurant.sort = this.sort;
        this.productsFromRestaurant.paginator = this.paginator;
      });
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

  public errorHandling = (control: string, error: string) => {
    return this.productForm.controls[control].hasError(error);
  };
  //Crear Videojueogo
  crearCupon(): void {
    console.log("object", this.productForm.value);

    var cupon: { nombre: any; descuento: any; idRestaurant: any; OrderDetail: any; }
    console.log(this.productForm.value);
    cupon = {
      nombre: this.productForm.value.name,
      descuento: this.productForm.value.disccount,
      idRestaurant: this.productForm.value.idRestaurant,
      OrderDetail: this.productsForCupon,
    }

    console.log(cupon);
    //Establecer submit verdadero
    this.submitted = true;
    //Verificar validación
    // if (this.productForm.invalid) {
    //   console.log("?");
    //   return;
    // }


    // //Obtener id Generos del Formulario y Crear arreglo con {id: value}
    // let gFormat: any = this.productForm.get('restaurants').value.map((x: any) => ({ ['id']: x }));
    // //Asignar valor al formulario 
    // this.productForm.patchValue({ restaurants: gFormat });


    this.gService.create('cupon', cupon)
      .pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
        //Obtener respuesta
        this.respProduct = data;
        this.router.navigate(['/cupon/cuponall'], {
          queryParams: { create: 'true' }
        });
      });
    this.notificacion.mensaje(
      'Creación de productos',
      'El producto ha sido creadp satisfactoriamente',
      TipoMessage.success
    );
  }
  //Actualizar Videojuego
  actualizarProducto() {
    // Establecer submit verdadero
    this.submitted = true;
    //Verificar validación
    if (this.productForm.invalid) {
      return;
    }
    //Obtener id Generos del Formulario y Crear arreglo con {id: value}
    let gFormat: any = this.productForm.get('restaurants').value.map((x: any) => ({ ['id']: x }));
    // Asignar valor al formulario 
    this.productForm.patchValue({ restaurants: gFormat });
    //Accion API create enviando toda la informacion del formulario
    this.gService.update('products', this.productForm.value)
      .pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
        console.log(data);
        //Obtener respuesta
        this.productForm = data;
        this.router.navigate(['/product/productall'], {
          queryParams: { update: 'true' }
        });
      });
    this.notificacion.mensaje(
      'Actualización de productos',
      'El producto ha sido actualizado satisfactoriamente',
      TipoMessage.success
    );
  }
  onReset() {
    this.submitted = false;
    this.productForm.reset();
  }
  onBack() {
    this.router.navigate(['/cupon/cuponall']);
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Desinscribirse
    this.destroy$.unsubscribe();
  }
}
