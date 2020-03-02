import { Component, OnInit } from '@angular/core';
import {MenuService} from '../shared/services/menu.service'
import Keyboard from 'simple-keyboard';
import {ToasterService} from 'angular2-toaster';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
keyboard:Keyboard;
selectedInput=""
 user={
   userName:"",
   terminal:"",
   password:""
 }
  constructor(
    private ms:MenuService,
    private toasterService: ToasterService
    ) { }
  ngOnInit() {
  }
 

  selectInp(data){
    this.selectedInput=data    
    if(this.selectedInput=='username'){     
      this.keyboard = new Keyboard({
        onChange: input => this.onChange(input),
        onKeyPress: button => this.onKeyPress(button)
      });
      this.keyboard.setInput( this.user.userName)
    }  
    else if(this.selectedInput=='terminal'){     
      this.keyboard = new Keyboard({
        onChange: input => this.onChange(input),
        onKeyPress: button => this.onKeyPress(button)
      });
      this.keyboard.setInput( this.user.terminal)
    }  
    else if(this.selectedInput=='password'){     
      this.keyboard = new Keyboard({
        onChange: input => this.onChange(input),
        onKeyPress: button => this.onKeyPress(button)
      });
      this.keyboard.setInput( this.user.password)
    }  
  }

  onChange = (input: string) => {
    if(this.selectedInput=='username'){
      this.user.userName=input
    }    
    if(this.selectedInput=='terminal'){
      this.user.terminal=input
    }  
    if(this.selectedInput=='password'){
      this.user.password=input
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
  login(){
    this.ms.login(this.user).subscribe(
      (data:string)=>{      
     localStorage.setItem("terminal_id",data)
    },
    (err)=>{
      this.toasterService.pop('error',  err.error);
    })
  }

}
