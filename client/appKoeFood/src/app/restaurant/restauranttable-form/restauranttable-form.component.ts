import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService, TipoMessage } from 'src/app/share/notification.service';

@Component({
  selector: 'app-restauranttable-form',
  templateUrl: './restauranttable-form.component.html',
  styleUrls: ['./restauranttable-form.component.css']
})
export class RestaurantTableForm implements OnInit {
  titleForm: string = 'Crear';
  destroy$: Subject<boolean> = new Subject<boolean>();
  restaurantList: any;
  tableEnumList: any;
  restaurantTableInfo: any;
  respRestaurantTable: any;
  submitted = false;
  restaurantTableForm: FormGroup;
  idRestaurantTable: number = 0;
  isCreate: boolean = true;
  states: string[]

  constructor(private fb: FormBuilder, private gService: GenericService,
    private router: Router, private activeRouter: ActivatedRoute, private notificacion: NotificacionService) {
    this.formularioReactive();
    this.listaRestaurantes();
    this.listaEstadosMesa();
  }
  ngOnInit(): void {
    //this.states = ['Reservada', 'Libre', 'Ocupada', 'Inactiva'];
    //Verificar si se envio un id por parametro para crear formulario para actualizar
    this.activeRouter.params.subscribe((params: Params) => {
      this.idRestaurantTable = params['id'];
      if (this.idRestaurantTable != undefined) {
        this.isCreate = false;
        this.titleForm = "Actualizar";
        //Obtener videojuego a actualizar del API
        this.gService.get('restauranttables', this.idRestaurantTable).pipe(takeUntil(this.destroy$))
          .subscribe((data: any) => {
            this.restaurantTableInfo = data;
            this.restaurantTableForm.setValue({
              id: this.restaurantTableInfo.id,
              code: this.restaurantTableInfo.code,
              capacity: this.restaurantTableInfo.capacity,
              state: this.restaurantTableInfo.state,
              idRestaurant: this.restaurantTableInfo.idRestaurant,
              // generos:this.restaurantTableInfo.generos.map(({id}) => id)
            })
          });
      }
    });
  }

  //Crear Formulario
  formularioReactive() {
    //[null, Validators.required]
    var totalOfTables = parseInt(window.localStorage.getItem("totalOfTables"))
    var finalCode = "KÖE-" + (totalOfTables + 1)
    this.restaurantTableForm = this.fb.group({
      id: [null, null],
      code: [finalCode, null],
      capacity: [null, Validators.required],
      state: [null, Validators.required],
      idRestaurant: [null, Validators.required],
    });
  }

  listaRestaurantes() {
    this.listaRestaurantes = null;
    this.gService
      .list('restaurants')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        // console.log(data);
        this.restaurantList = data;
      });
  }

  listaEstadosMesa() {
    this.listaEstadosMesa = null;
    this.gService
      .list('tablestatusenum')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        // console.log(data);
        this.tableEnumList = data;
      });
  }


  public errorHandling = (control: string, error: string) => {
    return this.restaurantTableForm.controls[control].hasError(error);
  };
  //Crear Videojueogo
  crearRestaurantTable(): void {

    //Establecer submit verdadero
    this.submitted = true;
    //Verificar validación
    if (this.restaurantTableForm.invalid) {
      return;
    }

    // //Obtener id Generos del Formulario y Crear arreglo con {id: value}
    // let gFormat:any=this.restaurantTableForm.get('generos').value.map(x=>({['id']: x }));
    // //Asignar valor al formulario 
    // this.restaurantTableForm.patchValue({ generos:gFormat});
    // console.log(this.restaurantTableForm.value);
    //Accion API create enviando toda la informacion del formulario
    this.gService.create('restauranttables', this.restaurantTableForm.value)
      .pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
        //Obtener respuesta
        this.respRestaurantTable = data;
        this.router.navigate(['/restaurant/tables'], {
          queryParams: { create: 'true' }
        });
      });
      this.notificacion.mensaje(
        'Actualización de mesas',
        'La mesa ha sido creada satisfactoriamente',
        TipoMessage.success
      );
  }
  //Actualizar Videojuego
  actualizarRestaurantTable() {
    //Establecer submit verdadero
    this.submitted = true;
    //Verificar validación
    if (this.restaurantTableForm.invalid) {
      return;
    }

    //Obtener id Generos del Formulario y Crear arreglo con {id: value}
    //let gFormat: any = this.restaurantTableForm.get('generos').value.map(x => ({ ['id']: x }));
    //Asignar valor al formulario 
    //this.restaurantTableForm.patchValue({ generos: gFormat });
    //console.log(this.restaurantTableForm.value);
    //Accion API create enviando toda la informacion del formulario
    this.gService.update('restauranttables', this.restaurantTableForm.value)
      .pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
        //Obtener respuesta
        this.respRestaurantTable = data;
        this.router.navigate(['/restaurant/tables'], {
          queryParams: { update: 'true' }
        });
      });
      this.notificacion.mensaje(
        'Actualización de mesas',
        'La mesa ha sido actualizada satisfactoriamente',
        TipoMessage.success
      );
  }
  onReset() {
    this.submitted = false;
    this.restaurantTableForm.reset();
  }
  onBack() {
    this.router.navigate(['/restaurant/tables']);
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Desinscribirse
    this.destroy$.unsubscribe();
  }
}
