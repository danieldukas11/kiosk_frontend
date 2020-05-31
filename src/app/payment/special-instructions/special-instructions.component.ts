import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import Keyboard from 'simple-keyboard';
@Component({
  selector: 'app-special-instructions',
  templateUrl: './special-instructions.component.html',
  styleUrls: ['./special-instructions.component.scss']
})
export class SpecialInstructionsComponent implements OnInit {

  constructor() { }
  specialInstruction = '';
  keyboard: Keyboard;
  @Output() changeroute = new EventEmitter();
  @Output() sendSpecialInstruction = new EventEmitter();
  ngOnInit(): void {
    this.selectInp();
  }


  selectInp() {
      this.keyboard = new Keyboard({
        onChange: input => this.onChange(input),
        onKeyPress: button => this.onKeyPress(button)
      });
      this.keyboard.setInput( this.specialInstruction);
  }

  onChange = (input: string) => {
      this.specialInstruction = input;
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
  sendInstruction(data) {
    this.sendSpecialInstruction.emit(data);
  }
  changeRoute(route) {
    this.changeroute.emit(route);
  }

}
