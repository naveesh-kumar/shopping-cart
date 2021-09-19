import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MycartService } from 'src/app/services/mycart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  count: any;
  user: any;
  constructor(private route: Router, private myCartSubject: MycartService) {}

  ngOnInit(): void {
    this.myCartSubject.getUpdatedCart().subscribe((data) => {
      this.count = data.length;
    });

    let userLoggedIn = window.localStorage?.getItem('user');

    if (userLoggedIn) {
      this.user = userLoggedIn;
    }
  }

  navigate(path: string): void {
    this.route.navigate([path]);
  }
}
