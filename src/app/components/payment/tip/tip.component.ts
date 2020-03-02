import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { RoutingService } from '../../../shared/services/routing.service';
import Keyboard from "simple-keyboard";
@Component({
  selector: 'app-tip',
  templateUrl: './tip.component.html',
  styleUrls: ['./tip.component.scss']
})
export class TipComponent implements OnInit {
  custom=false
@Input() price;
@Output() onSetTipData = new EventEmitter();
@Input() TAX
selectedInput=""
spec_instructions=""
tipValue = "";
keyboard: Keyboard;
  constructor(private rs:RoutingService) { }

  ngOnInit() {
  }

  cancel(){
    this.rs.setPayRoute(false)
  }
  getTip(price,percent){
    return Math.round((price+this.TAX)*percent)/100
  }


  setData(price,percent){
    let tip=Math.round((price+this.TAX)*percent)/100
    this.onSetTipData.emit(
      {
        tip:tip,
        spec_instructions:this.spec_instructions
      }
    )
  }

  selectInp(data){
    this.selectedInput=data
    
    if(this.selectedInput=='spec-instructions'){     
      this.keyboard = new Keyboard({
        onChange: input => this.onChange(input),
        onKeyPress: button => this.onKeyPress(button)
      });
      this.keyboard.setInput( this.spec_instructions)
    }  
    
    else if(this.selectedInput=='custom-tip'){
      this.keyboard = new Keyboard({
        onChange: input => this.onChange(input),
        onKeyPress: button => this.onKeyPress(button),
        inputPattern:/^\d+$/
      });
      this.keyboard.setInput( this.tipValue)
     
    }   
    
  }


  onChange = (input: string) => {
    if(this.selectedInput=='spec-instructions'){
      this.spec_instructions=input
    }    
    else  if(this.selectedInput=='custom-tip'){
      this.tipValue=input
    }  
  };

  onKeyPress = (button: string) => {

    /**
     * If you want to handle the shift and caps lock buttons
     */
    if(this.selectedInput!=='custom-tip'){
      if(button=="{enter}"){
        this.keyboard.setInput(this.keyboard.getInput()+"\r\n");
        this.onChange(this.keyboard.getInput())
      }
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
