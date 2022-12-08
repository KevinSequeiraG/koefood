import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RestaurantTableDetailComponent } from '../restauranttable-detail/restauranttable-detail.component';
import { NotificacionService, TipoMessage } from 'src/app/share/notification.service';

@Component({
  selector: 'app-restaurant-tables',
  templateUrl: './restaurant-tables.component.html',
  styleUrls: ['./restaurant-tables.component.css']
})
export class RestaurantTablesComponent implements AfterViewInit {

  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private router: Router,
    private route: ActivatedRoute, private gService: GenericService, private dialog: MatDialog, private notificacion: NotificacionService) {
  }

  displayedColumns = ['id'];

  ngAfterViewInit(): void {
    this.listaProducts();


  }
  listaProducts() {
    this.gService
      .list('restauranttables/alltables')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.datos = data;
        window.localStorage.setItem("totalOfTables", this.datos.length)
        console.log(this.datos.length)
      });
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  detalleRestaurantTable(id: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.data = {
      id: id
    };
    this.dialog.open(RestaurantTableDetailComponent, dialogConfig);
  }

  crearRestaurantTable() {
    this.router.navigate(['/restauranttable/create'], {
      relativeTo: this.route,
    });
  }

  actualizarStateTable(item) {
    //Establecer submit verdadero
    // this.submitted = true;
    // //Verificar validación
    // if (this.restaurantTableForm.invalid) {
    //   return;
    // }

    //Obtener id Generos del Formulario y Crear arreglo con {id: value}
    //let gFormat: any = this.restaurantTableForm.get('generos').value.map(x => ({ ['id']: x }));
    //Asignar valor al formulario 
    //this.restaurantTableForm.patchValue({ generos: gFormat });
    //console.log(this.restaurantTableForm.value);
    //Accion API create enviando toda la informacion del formulario

    console.log(item);
    if (item.state == "INACTIVE") {
      item.state = "FREE"
    } else {
      item.state = "INACTIVE"
    }


    this.gService.update('restauranttables', item)
      .pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
        //Obtener respuesta
        //this.respRestaurantTable = data;
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

  actualizarRestaurantTable(id: number) {
    this.router.navigate(['/restauranttable/update', id], {
      relativeTo: this.route,
    });
  }
}
