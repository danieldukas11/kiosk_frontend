import { Component, OnInit,OnDestroy } from '@angular/core';
import { PaymentService } from '../../shared/services/payment.service';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { ElectronService } from '../../shared/services/electron.service';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit, OnDestroy {
  order=[];
  tip=0;
  price=0;
  route="";
  tax=5;
  inserted_ammount=0;
  special_instructions="";
  alergy_info="";
  //port
  constructor(
    private ps: PaymentService,
    private router: Router,
    private socket: Socket,
    private electron: ElectronService
  ) { }

  ngOnInit() {
    this.ps.$paymentData.subscribe(data=>{
      data.forEach(prod=>{
        this.price=(this.price*1000+prod.price*1000)/1000;
        delete prod._id;
        delete prod.sizes;
        delete prod.sizable;
        delete prod.ingredients;
        delete prod.image;
        delete prod.customizable;
        if(prod.menus&&prod.menus.length){
          prod.menus.forEach(menu=> {
            delete menu._id;
            delete menu.specials_id;
            delete menu.products;
            delete menu.configurable;
            menu.default=menu.default[0];
            if (menu.default.size){
              menu.default.size=menu.default.size.title
            }
            delete menu.default._id;
            delete menu.default.special_menu_ids;
            delete menu.default.special_ids;
            delete menu.default.sizes;
            delete menu.default.sizable;
            delete menu.default.selected_ids;
            delete menu.default.menu_ids;
            delete menu.default.ingredients;
            delete menu.default.image;
            delete menu.default.customizable
            if(menu.default.defaults&&menu.default.defaults.length){
              menu.default.defaults.forEach(def=>{
                delete def._id;
                delete def.normal_price;
                delete def.light_price;
                delete def.image;
                delete def.selected
                delete def.double_price
              })
            }
          });
        }
        if(prod.defaults&&prod.defaults.length){
          prod.defaults.forEach(def=>{
            delete def.selected
            delete def._id;
            delete def.normal_price;
            delete def.light_price;
            delete def.image
            delete def.double_price
          })
        }
      })
      this.order=data
      this.route="select-tip"
    })
    /*this.electron.serialPort.list().then((ports:any)=>{
      console.log("ports",ports)
      this.port = new this.electron.serialPort("COM3", {
        baudRate: 9600,
        databits: 8,
        stopbits: 2,
        parser: this.electron.serialPort.parsers.raw
      },false)
      console.log("Port",this.port)
      this.port.on('close', function () {
        console.log('close');
      });
      this.port.on('error', function(err) {
        console.log('Error: ', err.message)
      })
      let a=Buffer.from("0x01")
      this.port.open((err) => {
        this.port.write(a, function(err) {
          if (err) {
            return console.log('Error on write: ', err.message)
          }
          console.log('message written', a)
        })
        
        
        this.port.on('data', function (data) {
          console.log('Data:', data)
        })
      })
      
      
   
   }).catch((err:any)=>{
    
   });*/

   
  }
  ngOnDestroy(){
   /* if(this.port){
      this.port.close()
    }*/
  }

  setTipData(event){
    this.tip=event.tip
    this.alergy_info=event.spec_instructions;
    this.route="select-pay-method"   
  }

  getTax(tax, price){
    return Math.round(tax*price)/100
  }
  getTotal(tax,price,tip){
    return Math.round((this.getTax(tax,price)+tip+price)*100)/100
  }
  setPayment(event){
    this.special_instructions=event.spec_instructions
    switch(event.paytype){
      case "cash":
        this.route="cash-pay"
        
        setTimeout(()=>{
          this.inserted_ammount=this.getTotal(this.tax,this.price,this.tip)+5
          this.checkPayment()
        },3000)
        break;
      case "card":
          this.route="card-pay"
        break
      default:
        break
    }
  }

  checkPayment(){
    if(this.inserted_ammount>=this.getTotal(this.tax,this.price,this.tip)){
      this.route="cash-pay-finish"
    }
  }

  finish(){
    this.route="pay-finish"
  }
  close(){
    let order={
      orderedProducts:this.order,
      subTotal:this.price,
      special_instructions:this.special_instructions,
      alergy_info:this.alergy_info,
      tax:this.getTax(this.tax,this.price),
      tip:this.tip,
      total:this.getTotal(this.tax,this.price,this.tip)
    }
    this.socket.emit("pay",order)
    this.router.navigate(['/']);
  }
  submit(){
    this.router.navigate(['/']);
  }
  goBack(){
    this.route="select-pay-method"
  }
}
