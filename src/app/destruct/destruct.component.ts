import { Component, OnInit, OnDestroy } from '@angular/core';
import { timer, Subscription } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-destruct',
  templateUrl: './destruct.component.html',
  styleUrls: ['./destruct.component.scss']
})
export class DestructComponent implements OnInit, OnDestroy {
destructing = false;
seconds = timer(20000, 1400);
leftsecconds = 5;
sub: Subscription;
  constructor( private router: Router) {
   }

  ngOnInit(): void {
   this.reSubscribe();
  }
  reSubscribe() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
    this.sub = this.seconds.subscribe((value) => {
      this.leftsecconds = 5 - value;
      this.destructing = true;
      if (value >= 5) {
        this.router.navigateByUrl('');
      }
    });
  }


resetTimer() {
  this.reSubscribe();
  this.destructing = false;
}
ngOnDestroy() {
  if (this.sub) {
    this.sub.unsubscribe();
  }
}

}
