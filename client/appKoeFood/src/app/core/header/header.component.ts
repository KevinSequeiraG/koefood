import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, Event } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isSidebarOpen: boolean = false;
  isLoginPage: boolean = true;
  
  constructor(private router: Router) {
    console.log(router.config[4])
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        //console.log(event)
        this.isLoginPage = event.url == '**' ;
      }
    });
  }

  ngOnInit(): void {}

  openCloseSidenavbar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
