import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {EventsListComponent} from './events-list/events-list.component';
import {SingleEventComponent} from './single-event/single-event.component';


const routes: Routes = [
  {
    path: '',
    component: EventsListComponent
  },
  {
    path: 'event/:id',
    component: SingleEventComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KioskAdminRoutingModule {
}
