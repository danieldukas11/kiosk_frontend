import { Component, OnInit } from '@angular/core';
import {KioskService} from '../shared/services/kiosk.service';
import Keyboard from 'simple-keyboard';
import {ToasterService} from 'angular2-toaster';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
keyboard: Keyboard;
selectedInput = '';
 user = {
   userName: '',
   password: ''
 };
  constructor(
    private ks: KioskService,
    private toasterService: ToasterService,
    private router: Router,
    ) { }
  ngOnInit() {
    this.selectInp('username');
  }
  selectInp(data) {
    this.selectedInput = data;
    if (this.selectedInput === 'username') {
      this.keyboard = new Keyboard({
        onChange: input => this.onChange(input),
        onKeyPress: button => this.onKeyPress(button)
      });
      this.keyboard.setInput( this.user.userName);
    } else
    if (this.selectedInput === 'password') {
      this.keyboard = new Keyboard({
        onChange: input => this.onChange(input),
        onKeyPress: button => this.onKeyPress(button)
      });
      this.keyboard.setInput(this.user.password);
    }
  }

  onChange = (input: string) => {
    if (this.selectedInput === 'username') {
      this.user.userName = input;
    }
    if (this.selectedInput === 'password') {
      this.user.password = input;
    }
  }
  onKeyPress = (button: string) => {
    if (button === '{enter}') {
      this.keyboard.setInput(this.keyboard.getInput() + '\r\n');
      this.onChange(this.keyboard.getInput());
    }
    if (button === '{shift}' || button === '{lock}') {
      this.handleShift();
    }
  }

  onInputChange = (event: any) => {
    this.keyboard.setInput(event.target.value);
  }

  handleShift = () => {
    const currentLayout = this.keyboard.options.layoutName;
    const shiftToggle = currentLayout === 'default' ? 'shift' : 'default';

    this.keyboard.setOptions({
      layoutName: shiftToggle
    });
  }
  login() {
    this.ks.login(this.user).subscribe(
      (data: string) => {
     localStorage.setItem('user', data);
     this.router.navigateByUrl('/');

    },
    (err) => {
      this.toasterService.pop('error',  err.error);
    });
  }

}
