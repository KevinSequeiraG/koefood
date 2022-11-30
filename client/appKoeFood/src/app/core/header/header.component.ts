import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, Event } from '@angular/router';
import { AuthenticationService } from 'src/app/share/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isSidebarOpen: boolean = false;
  isLoginPage: boolean = true;
  loggedUser: any = null;
  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.isLoginPage =
          event.url == '/' ||
          event.url == '/usuario/login' ||
          event.url == '/usuario/registrar';
      }
      if (!this.isLoginPage) {
        this.loggedUser = JSON.parse(window.localStorage.getItem('currentUser'));
      }
    });
  }

  ngOnInit(): void {
  }

  openCloseSidenavbar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['usuario/login']);
  }
}
