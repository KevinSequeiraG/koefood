import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RestaurantTableDetailComponent } from '../restauranttable-detail/restauranttable-detail.component';
import { CartService } from 'src/app/share/cart.service';
import {
  NotificacionService,
  TipoMessage,
} from 'src/app/share/notification.service';

@Component({
  selector: 'app-restaurant-tables',
  templateUrl: './restaurant-tables-waiter.component.html',
  styleUrls: ['./restaurant-tables-waiter.component.css'],
})
export class RestaurantTablesWaiterComponent implements AfterViewInit {
  datos: any;
  loggedUser: any = JSON.parse(window.localStorage.getItem('currentUser'));
  destroy$: Subject<boolean> = new Subject<boolean>();
  dataSource = new MatTableDataSource<any>();

  constructor(
    private router: Router,
    private gService: GenericService,
    private dialog: MatDialog
  ) {}

  displayedColumns = ['id'];

  ngAfterViewInit(): void {
    this.listaTables();
  }

  listaTables() {
    this.gService
      .list(`restauranttables/waiter/${this.loggedUser.user.idRestaurant}`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.datos = data;
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
      id: id,
    };
    this.dialog.open(RestaurantTableDetailComponent, dialogConfig);
  }

  addOrder(id: number) {
    this.router.navigate([
      'product/listofproducts/',
      this.loggedUser.user.idRestaurant,
    ]);
  }
}