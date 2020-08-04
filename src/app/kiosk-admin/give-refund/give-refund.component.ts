import {AfterViewInit, Component, OnInit} from '@angular/core';
import Keyboard from 'simple-keyboard';

@Component({
  selector: 'app-give-refund',
  templateUrl: './give-refund.component.html',
  styleUrls: ['./give-refund.component.scss']
})
export class GiveRefundComponent implements OnInit, AfterViewInit {

  keyboard: Keyboard;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.keyboard = new Keyboard({
      onChange: input => this.onChange(input),
      onKeyPress: button => this.onKeyPress(button)
    });
  }

  onChange(val: string) {
    // document.querySelector(this.selectedInput.selector).value = val;
    // this.loginForm.get(this.selectedInput.name).patchValue(val);
  }

  onKeyPress(button: string) {

    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === '{shift}' || button === '{lock}') {
      this.handleShift();
    }
  }

  handleShift() {
    const currentLayout = this.keyboard.options.layoutName;
    const shiftToggle = currentLayout === 'default' ? 'shift' : 'default';

    this.keyboard.setOptions({
      layoutName: shiftToggle
    });
  }


}
