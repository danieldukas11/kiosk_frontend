import { Component, OnInit, Output, EventEmitter,Input } from '@angular/core';
import { RoutingService } from '../../../shared/services/routing.service';

@Component({
  selector: 'app-cash-pay',
  templateUrl: './cash-pay.component.html',
  styleUrls: ['./cash-pay.component.scss']
})
export class CashPayComponent implements OnInit {
  @Output() onSetPayMethod = new EventEmitter();
  @Output() onGoBack = new EventEmitter();
  @Input() total
  @Input() inserted
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
