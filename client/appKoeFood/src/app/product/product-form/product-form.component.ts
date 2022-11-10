import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService, TipoMessage } from 'src/app/share/notification.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductForm implements OnInit {
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

  constructor(private fb: FormBuilder, private gService: GenericService,
    private router: Router, private activeRouter: ActivatedRoute, private notificacion: NotificacionService) {
    this.formularioReactive();
    this.listaRestaurantes();
    this.listaCategorias();
  }
  ngOnInit(): void {
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
              price: this.productInfo.price,
              state: this.productInfo.state,
              restaurants: this.productInfo.restaurants.map(({ id }) => id),
              // generos:this.restaurantTableInfo.generos.map(({id}) => id)
            })
          });
      }
    });
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
      price: [null, Validators.required],
      state: [true, Validators.required],
      restaurants: [null, Validators.required],
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
  crearProducto(): void {

    //Establecer submit verdadero
    this.submitted = true;
    //Verificar validación
    if (this.productForm.invalid) {
      return;
    }


    //Obtener id Generos del Formulario y Crear arreglo con {id: value}
    let gFormat: any = this.productForm.get('restaurants').value.map(x => ({ ['id']: x }));
    //Asignar valor al formulario 
    this.productForm.patchValue({ restaurants: gFormat });


    this.gService.create('products', this.productForm.value)
      .pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
        //Obtener respuesta
        this.respProduct = data;
        this.router.navigate(['/product/productall'], {
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
    let gFormat: any = this.productForm.get('restaurants').value.map(x => ({ ['id']: x }));
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
    this.router.navigate(['/product/productall']);
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Desinscribirse
    this.destroy$.unsubscribe();
  }
}
