import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoomListComponent } from './components/room-list/room-list.component';
import { RoomPageComponent } from './components/room-page/room-page.component';
import { RoomListResolver } from './services/room-list-resolver.service';
import { RoomPageResolver } from './services/room-page-resolver.service';


const routes: Routes = [
  {
    path: "",
    redirectTo: "campus",
    pathMatch: "full"
  },
  {
    path: "campus",
    component: RoomListComponent
    // resolve: {
    //   rooms: RoomListResolver
    // }
  },
  {
    path: "campus/:roomID",
    component: RoomPageComponent
    // resolve: {
    //   room: RoomPageResolver
    // }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
