import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { RoutingService } from '../../../shared/services/routing.service';

@Component({
  selector: 'app-card-pay',
  templateUrl: './card-pay.component.html',
  styleUrls: ['./card-pay.component.scss']
})
export class CardPayComponent implements OnInit {
  @Output() onSetPayMethod = new EventEmitter();
  @Output() onGoBack = new EventEmitter();
  @Input() total

  constructor(
    private rs:RoutingService
  ) { }

  ngOnInit() {
  }

  cancel(){
    this.rs.setPayRoute(false)
  }
  setpaytype(data){
    this.onSetPayMethod.emit(data)
  }
  goBack(){
    this.onGoBack.emit("")
  }
}
