import { Component, OnInit,Output, EventEmitter } from '@angular/core';
import Keyboard from "simple-keyboard";
@Component({
  selector: 'app-payment-finish',
  templateUrl: './payment-finish.component.html',
  styleUrls: ['./payment-finish.component.scss']
})
export class PaymentFinishComponent implements OnInit {
  keyboard: Keyboard;
  selectedInput=""
  email=""
  phone = "";
  @Output() onClose=new EventEmitter();
  @Output() onSubmit=new EventEmitter();
  constructor() { }

  ngOnInit() {
  }


  selectInp(data){
    this.selectedInput=data
    
    if(this.selectedInput=='email'){     
      this.keyboard = new Keyboard({
        onChange: input => this.onChange(input),
        onKeyPress: button => this.onKeyPress(button)
      });
      this.keyboard.setInput( this.email)
    }  
    
    else if(this.selectedInput=='phone'){
      this.keyboard = new Keyboard({
        onChange: input => this.onChange(input),
        onKeyPress: button => this.onKeyPress(button),
        inputPattern:/^\d+$/
      });
      this.keyboard.setInput( this.phone)
     
    }
    
    
  }


  onChange = (input: string) => {
    if(this.selectedInput=='email'){
      this.email=input
    }    
    else  if(this.selectedInput=='phone'){
      this.phone=input
    }  
  };

  onKeyPress = (button: string) => {
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

  close(){
    this.onClose.emit("")
  }
  submit(){
    this.onSubmit.emit("")
  }


}
