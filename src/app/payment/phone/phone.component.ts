import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.scss']
})
export class PhoneComponent implements OnInit {
phone = '';
@Output() addphone = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  text(t) {
    this.phone += t;
  }
  backspace(phone) {
    return phone.substr(0, phone.length - 1);
  }
  addPhone(phone) {
   this.addphone.emit(phone);
  }

}
