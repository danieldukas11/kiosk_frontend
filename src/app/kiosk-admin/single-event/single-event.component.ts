import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EVENTS_TEMP_LIST} from '../../shared/constants/general';
import * as moment from 'moment';

@Component({
  selector: 'app-single-event',
  templateUrl: './single-event.component.html',
  styleUrls: ['./single-event.component.scss']
})
export class SingleEventComponent implements OnInit {
  selectedEvent;

  constructor(
    private route: ActivatedRoute,
    public router: Router
  ) {
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.params;
    this.selectedEvent = EVENTS_TEMP_LIST.find(ev => ev._id === +routeParams.id);
  }

  getEventDate(d) {
    return moment(d, 'MMM D YYYY').format('DD/MM/YYYY');
  }

}
