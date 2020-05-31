import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import Keyboard from 'simple-keyboard';
@Component({
  selector: 'app-alergy-info',
  templateUrl: './alergy-info.component.html',
  styleUrls: ['./alergy-info.component.scss']
})
export class AlergyInfoComponent implements OnInit {

  constructor() { }

  alergy = '';
  keyboard: Keyboard;
  @Output() changeroute = new EventEmitter();
  @Output() sendAlergyInfo = new EventEmitter();
  ngOnInit(): void {
    this.selectInp();
  }


  selectInp() {
      this.keyboard = new Keyboard({
        onChange: input => this.onChange(input),
        onKeyPress: button => this.onKeyPress(button)
      });
      this.keyboard.setInput( this.alergy);
  }

  onChange = (input: string) => {
      this.alergy = input;
  }

  onKeyPress = (button: string) => {
    if (button === '{enter}') {
      this.keyboard.setInput(this.keyboard.getInput() + '\r\n');
      this.onChange(this.keyboard.getInput());
    }
    if (button === '{shift}' || button === '{lock}') { this.handleShift(); }
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
  sendAlergy(data) {
    this.sendAlergyInfo.emit(data);
  }
  changeRoute(route) {
    this.changeroute.emit(route);
  }


}
