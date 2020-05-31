import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';


@Component({
  selector: 'app-tip',
  templateUrl: './tip.component.html',
  styleUrls: ['./tip.component.scss']
})
export class TipComponent implements OnInit {
  @Input() total;
  @Input() subtotal;
  @Input() tax;
  @Output() changeroute = new EventEmitter();
  @Output() settip = new EventEmitter<number>();
  Tip = '0';
  @Input() tip ;
  @Input() hasTip;
  ngOnInit() {
  }

  backspace(tip) {
    return tip.substr(0, tip.length - 1);
  }
  changeRoute(route) {
    this.changeroute.emit(route);
  }
  text(t) {
    String(this.Tip[0]) === '0' ? this.Tip = t : this.Tip += t;
  }
  setTip(t) {
    this.hasTip = true;
    this.Tip = t;
    this.settip.emit(Number(t));
  }
  calcTip(t, sub) {
    return Math.round((sub * t / 100)  * 100) / 100;
  }




}
