import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-cupones-all',
  templateUrl: './cupones-all.component.html',
  styleUrls: ['./cupones-all.component.css']
})
export class CuponesAllComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  listOfCupones: any;
  datos: any;
  // @ViewChild(MatSort) sort!: MatSort;
  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private router: Router, private route: ActivatedRoute, private gService: GenericService) {

  }

  ngOnInit(): void {
    this.listaCupones()

  }

  getTotales() {
    var listWithTotals = []
    this.listOfCupones.map(cupon => {
      var subTotal = 0
      var iva = 0
      var total = 0
      var disccountTotal = 0
      cupon.OrderDetail.map(producto => {
        subTotal += producto.total
      })

      iva = subTotal * 0.13
      disccountTotal = (subTotal + iva) * cupon.descuento
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
        // this.listOfCupones.sort = this.sort;
        // this.listOfCupones.paginator = this.paginator;
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

}
