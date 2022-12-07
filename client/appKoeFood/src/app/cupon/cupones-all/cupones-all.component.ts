import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cupones-all',
  templateUrl: './cupones-all.component.html',
  styleUrls: ['./cupones-all.component.css']
})
export class CuponesAllComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { 
    
  }

  ngOnInit(): void {
  }

  crearOrden() {
    this.router.navigate(['/cupon/create'], {
      relativeTo: this.route,
    });
  }

}
