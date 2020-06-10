import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KioskAdminRoutingModule } from './kiosk-admin-routing.module';
import { EventsListComponent } from './events-list/events-list.component';
import { SingleEventComponent } from './single-event/single-event.component';


@NgModule({
  declarations: [EventsListComponent, SingleEventComponent],
  imports: [
    CommonModule,
    KioskAdminRoutingModule
  ]
})
export class KioskAdminModule { }
