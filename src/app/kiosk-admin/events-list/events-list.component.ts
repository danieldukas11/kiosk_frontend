import {Component, OnInit} from '@angular/core';
import {EVENTS_TEMP_LIST} from '../../shared/constants/general';
import {Router} from '@angular/router';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit {
  events = EVENTS_TEMP_LIST;

  constructor(
    public router: Router
  ) {
  }

  ngOnInit(): void {
  }

}
