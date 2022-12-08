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
import { ProductDetailComponent } from 'src/app/product/product-detail/product-detail.component';
import { NotificacionService, TipoMessage } from 'src/app/share/notification.service';

@Component({
  selector: 'app-user-all',
  templateUrl: './user-all.component.html',
  styleUrls: ['./user-all.component.css'],
})
export class UserAllComponent implements AfterViewInit {
  datos: any;

  destroy$: Subject<boolean> = new Subject<boolean>();
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService,
    private dialog: MatDialog,
    private notificacion: NotificacionService
  ) {}

  displayedColumns = [
    'name',
    'lastname',
    'id',
    'userType',
    'email',
    'idRestaurant',
    'state',
    'actions',
  ];

  ngAfterViewInit(): void {
    this.listaUsers();
  }

  listaUsers() {
    this.gService
      .list('user/')
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

  //faltaaaaaaaaaaaaaaaaa
  detailProduct(id: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.data = {
      id: id,
    };
    this.dialog.open(ProductDetailComponent, dialogConfig);
  }

  crearUsuario() {
    this.router.navigate(['/user/create'], {
      relativeTo: this.route,
    });
  }

  activarUsuario(id: any) {
    this.gService
      .get('user/updatestateactive', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        //Obtener respuesta
        console.log(data);
        this.listaUsers();
        this.notificacion.mensaje(
          'Usuarios',
          'Usuario activado correctamente.',
          TipoMessage.success
        );
      });
  }

  desactivarUsuario(id: any) {
    this.gService
      .get('user/updatestateinactive', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        //Obtener respuesta
        console.log(data);
        this.listaUsers();
        this.notificacion.mensaje(
          'Usuarios',
          'Usuario desactivado correctamente.',
          TipoMessage.success
        );
      });
  }

  deleteUser(id: any) {
    this.gService
      .get('user/deleteUser', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        //Obtener respuesta
        console.log(data);
        this.listaUsers();
        this.notificacion.mensaje(
          'Usuarios',
          'Usuario eliminado correctamente.',
          TipoMessage.success
        );
      });
  }

  actualizarProduct(id: number) {
    console.log(id);
    this.router.navigate(['/user/update', id], {
      relativeTo: this.route,
    });
  }
}
