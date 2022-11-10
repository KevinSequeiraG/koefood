import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RestaurantTableDetailComponent } from '../restauranttable-detail/restauranttable-detail.component';

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
    private route: ActivatedRoute, private gService: GenericService, private dialog: MatDialog) {
  }

  displayedColumns = ['id'];

  ngAfterViewInit(): void {
    this.listaProducts();

  
  }
  listaProducts() {
    this.gService
      .list('restauranttables/')
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

  actualizarRestaurantTable(id: number) {
    this.router.navigate(['/restauranttable/update', id], {
      relativeTo: this.route,
    });
  }
}
