import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { GenericService } from 'src/app/share/generic.service';
import {
  NotificacionService,
  TipoMessage,
} from 'src/app/share/notification.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserForm implements OnInit {
  titleForm: string = 'Crear';
  destroy$: Subject<boolean> = new Subject<boolean>();
  restaurantList: any;
  categoryList: any;
  userInfo: any;
  respProduct: any;
  submitted = false;
  userForm: FormGroup;
  idUser: number = 0;
  isCreate: boolean = true;
  //showSelectRol: boolean = false;

  constructor(
    private fb: FormBuilder,
    private gService: GenericService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private notificacion: NotificacionService,
    private authService: AuthenticationService,
  ) {
    this.formularioReactive();
    this.listaRestaurantes();
    this.listaCategorias();
  }
  ngOnInit(): void {
    //Verificar si se envio un id por parametro para crear formulario para actualizar
    this.activeRouter.params.subscribe((params: Params) => {
      this.idUser = params['id'];
      console.log(this.idUser);
      if (this.idUser != undefined) {
        this.isCreate = false;
        this.titleForm = 'Actualizar';

        //Obtener videojuego a actualizar del API
        this.gService
          .get('user', this.idUser)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: any) => {
            console.log(data);
            this.userInfo = data;
            console.log('info', this.userInfo);
            // if (this.userInfo.userType == 'WAITER') {
            //   this.showSelectRol = true;
            // }
            this.userForm.setValue({
              id: this.userInfo.id,
              name: this.userInfo.name,
              lastname: this.userInfo.lastname,
              userType: this.userInfo.userType,
              email: this.userInfo.email,
              password: this.userInfo.password,
              idRestaurant: this.userInfo.idRestaurant,
              // restaurants: this.userInfo.restaurants.map(({ id }) => id),
              // generos:this.restaurantTableInfo.generos.map(({id}) => id)
            });
          });
      }
    });
  }

  onChangeType(){

   // const rolSelected = document.getElementById("selectRol");
    console.log("ayua");
  }

  //Crear Formulario
  formularioReactive() {
    //[null, Validators.required]
    // var totalOfTables = parseInt(window.localStorage.getItem("totalOfTables"))
    // var finalCode = "KOE-" + (totalOfTables + 1)
    this.userForm = this.fb.group({
      id: [null, Validators.required],
      name: [null, Validators.required],
      lastname: [null, Validators.required],
      userType: [null, Validators.required],
      email: [null, Validators.required],
      password: [null, Validators.required],
      idRestaurant: [true, Validators.required],
      //restaurants: [null, Validators.required],
    });
    console.log(this.userForm.controls['userType']);
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
      .list('rol')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.categoryList = data;
      });
  }

  public errorHandling = (control: string, error: string) => {
    return this.userForm.controls[control].hasError(error);
  };
  //Crear Videojueogo
  crearUsuario(): void {
    //Establecer submit verdadero
    this.submitted = true;
    //Verificar validación
    if (this.userForm.invalid) {
      return;
    }

    // //Obtener id Generos del Formulario y Crear arreglo con {id: value}
    // let gFormat: any = this.userForm
    //   .get('restaurants')
    //   .value.map((x) => ({ ['id']: x }));
    // //Asignar valor al formulario
    // this.userForm.patchValue({ restaurants: gFormat });

    this.authService
    .createUser(this.userForm.value)
    .subscribe((respuesta: any) => {
      //Redireccionar al loguearse
      this.router.navigate(['/usuario/login'], {
        //Mostrar mensaje
        queryParams: { register: 'true' },
      });
    });
    this.notificacion.mensaje(
      'Creación de productos',
      'El producto ha sido creadp satisfactoriamente',
      TipoMessage.success
    );
  }
  //Actualizar Videojuego
  actualizarUsuario() {
    // Establecer submit verdadero
    this.submitted = true;
    //Verificar validación
    if (this.userForm.invalid) {
      return;
    }
    //Obtener id Generos del Formulario y Crear arreglo con {id: value}
    let gFormat: any = this.userForm
      .get('restaurants')
      .value.map((x) => ({ ['id']: x }));
    // Asignar valor al formulario
    this.userForm.patchValue({ restaurants: gFormat });
    //Accion API create enviando toda la informacion del formulario
    this.gService
      .update('products', this.userForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        //Obtener respuesta
        this.userForm = data;
        this.router.navigate(['/product/productall'], {
          queryParams: { update: 'true' },
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
    this.userForm.reset();
  }
  onBack() {
    this.router.navigate(['/users/userall']);
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Desinscribirse
    this.destroy$.unsubscribe();
  }
}
