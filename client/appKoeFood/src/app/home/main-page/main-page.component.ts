import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CartService } from 'src/app/share/cart.service';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  isAdmin: boolean;
  isWaiter: boolean;
  isUser: boolean;
  destroy$: Subject<boolean> = new Subject<boolean>();
  restaurantList: any;

  constructor(
    private gService: GenericService,
    private router: Router,
    private route: ActivatedRoute,
    private cartService: CartService,
  ) {
    this.isAdmin = false;
    this.isUser = false;
    this.isWaiter = false;
  }

  ngOnInit(): void {
    this.DefinirTipoUsuario();
    this.listaRestaurantes();
    this.cartService.deleteCart();
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

  chooseRestaurant(id: any) {
    this.router.navigate(['product/listofproducts/', id]);
  }

  DefinirTipoUsuario() {
    var x = JSON.parse(window.localStorage.getItem('currentUser'));
    switch (x.user.userType) {
      case 'ADMIN':
        this.isAdmin = true;
        break;
      case 'USER':
        this.isUser = true;
        break;
      case 'WAITER':
        this.isWaiter = true;
        break;

      default:
        console.log('2');
        break;
    }
  }
}
