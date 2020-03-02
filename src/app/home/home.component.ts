import { Component, OnInit } from '@angular/core';
import {environment} from '../../environments/environment'
import { RoutingService } from '../shared/services/routing.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  imgUrl=environment.staticUrl +'images/'
  constructor(   
  ) { }

  ngOnInit() {
  }
 
authorize(){
  return localStorage.getItem("terminal_id")
}

}
