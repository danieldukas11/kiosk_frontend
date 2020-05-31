import { Component, OnInit, OnDestroy } from '@angular/core';
import { timer, Subscription } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-logout-button',
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.scss']
})
export class LogoutButtonComponent implements OnInit, OnDestroy {
  seconds = timer(0, 500);
  tapSize = 0;
  sub: Subscription;
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.reSubscribe();
  }



  reSubscribe() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
    this.sub = this.seconds.subscribe((value) => {
      if (value >= 1) {
        this.tapSize = 0;
      }
    });
  }
  doTap() {
    this.reSubscribe();
    this.tapSize++;
    if (this.tapSize === 5) {
      this.tapSize = 0;
      this.router.navigateByUrl('pin');
    }
  }
  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
