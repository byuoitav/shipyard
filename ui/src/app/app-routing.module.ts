import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuildingListComponent } from './components/building-list/building-list.component';
import { RoomListComponent } from './components/room-list/room-list.component';
import { RoomPageComponent } from './components/room-page/room-page.component';


const routes: Routes = [
  {
    path: "",
    redirectTo: "campus",
    pathMatch: "full"
  },
  {
    path: "campus",
    component: BuildingListComponent
  },
  {
    path: "campus/:bldgID/roomList",
    component: RoomListComponent
  },
  {
    path: "campus/:roomID",
    component: RoomPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
