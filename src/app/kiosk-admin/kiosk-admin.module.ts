import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {KioskAdminRoutingModule} from './kiosk-admin-routing.module';
import {EventsListComponent} from './events-list/events-list.component';
import {SingleEventComponent} from './single-event/single-event.component';
import {GiveRefundComponent} from './give-refund/give-refund.component';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [EventsListComponent, SingleEventComponent, GiveRefundComponent],
  imports: [
    CommonModule,
    KioskAdminRoutingModule,
    SharedModule
  ]
})
export class KioskAdminModule {
}
