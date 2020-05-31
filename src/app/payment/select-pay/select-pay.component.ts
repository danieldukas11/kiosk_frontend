import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import Keyboard from 'simple-keyboard';

@Component({
  selector: 'app-select-pay',
  templateUrl: './select-pay.component.html',
  styleUrls: ['./select-pay.component.scss']
})
export class SelectPayComponent implements OnInit {
  @Input()sub_total;
  @Input() tip;
  @Input() TAX;
  @Input()total
 /* @Output() onSetPayData = new EventEmitter();*/
  @Output() OnFinish=new EventEmitter()
  keyboard: Keyboard;
  selectedInput=""
  spec_instructions=""
  constructor() { }

  ngOnInit() {
  }
  finish(){
    this.OnFinish.emit("")
  }

  /*setpaytypeData(data){
    let payData={
      paytype:data,
      spec_instructions:this.spec_instructions
    }
    this.onSetPayData.emit(payData)
  }*/

  selectInp(data){
    this.selectedInput=data    
    if(this.selectedInput=='spec-instructions'){     
      this.keyboard = new Keyboard({
        onChange: input => this.onChange(input),
        onKeyPress: button => this.onKeyPress(button)
      });
      this.keyboard.setInput( this.spec_instructions)
    }  
  }

  onChange = (input: string) => {
    if(this.selectedInput=='spec-instructions'){
      this.spec_instructions=input
    }    
    
  };

  onKeyPress = (button: string) => {
   
    if(button=="{enter}"){
      this.keyboard.setInput(this.keyboard.getInput()+"\r\n");
      this.onChange(this.keyboard.getInput())
    }
    
   
    if (button === "{shift}" || button === "{lock}") this.handleShift();
  };

  onInputChange = (event: any) => {
    this.keyboard.setInput(event.target.value);
  };

  handleShift = () => {
    let currentLayout = this.keyboard.options.layoutName;
    let shiftToggle = currentLayout === "default" ? "shift" : "default";

    this.keyboard.setOptions({
      layoutName: shiftToggle
    });
  };
  
}
