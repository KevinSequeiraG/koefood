import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-reporte-pdf',
  templateUrl: './reporte-pdf.component.html',
  styleUrls: ['./reporte-pdf.component.css'],
})
export class ReportePDFComponent implements OnInit {
  datos: any;
  filtroFechaI: any;
  filtroFechaF: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private gService: GenericService) {}

  ngOnInit(): void {
    //Obtener información del API
    this.gService
      .get('orders/vTotalMDefault', 0)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.datos = data;
      });
  }
  generarTabla() {
    this.filtroFechaI = document.getElementById('filtroFechaI');
    this.filtroFechaF = document.getElementById('filtroFechaF');
    const input = document.getElementById('filter-select') as HTMLSelectElement;

    if (this.filtroFechaI.value && this.filtroFechaF.value) {
      //Obtener información del API
      this.gService
        .getTP(
          'orders/vTotalM',
          this.filtroFechaI.value.toString(),
          this.filtroFechaF.value.toString(),
          input.selectedIndex
        )
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          this.datos = data;
          console.log(data);
        });
    } else {
      this.gService
        .get('orders/vTotalMDefault', input.selectedIndex)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          this.datos = data;
        });
    }
  }
  //npm install jspdf
  openPDF() {
    //htmlData: id del elemento HTML
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      //Configuración del ancho y alto del Canvas de la imagen
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      //devuelve un data URI,el cual contiene una representación
      // de la imagen en el formato especificado por el parámetro type
      const FILEURI = canvas.toDataURL('image/png');
      //Orientación, unidad, formato
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      //Agregar imagen al PDF
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('reporte.pdf');
    });
  }
}
