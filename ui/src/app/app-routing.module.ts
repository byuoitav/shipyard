import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuildingListComponent } from './components/building-list/building-list.component';
import { RoomListComponent } from './components/room-list/room-list.component';


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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
