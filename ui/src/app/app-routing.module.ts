import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListViewComponent } from './list-view/list-view.component';
import { BuildingsComponent } from './buildings/buildings.component';
import { RoomsComponent } from './rooms/rooms.component';
import { SystemsComponent } from './systems/systems.component';
import { DevicesComponent } from './devices/devices.component';
import { RoomListComponent } from './room-list/room-list.component';
import { RoomConfigComponent } from './room-config/room-config.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'rooms',
    pathMatch: 'full'
  },
  {
    path: 'rooms',
    component: RoomListComponent
  },
  {
    path: 'room-config/:roomID',
    component: RoomConfigComponent
  },
  {
    path: 'campuses',
    component: ListViewComponent
  },
  {
    path: 'buildings',
    component: BuildingsComponent
  },
  // {
  //   path: 'rooms',
  //   component: RoomsComponent,
  // },
  {
    path: 'systems',
    component: SystemsComponent,
  },
  {
    path: 'devices',
    component: DevicesComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
