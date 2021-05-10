import { Component, OnInit } from '@angular/core';
import { Room, ApiService } from 'src/app/services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { RoomDialogComponent } from '../room-dialog/room-dialog.component';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit {
  bldgID: string = "";
  rooms: Room[];


  constructor(private route: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    private dialog: MatDialog) {
    this.route.params.subscribe(params => {
      this.bldgID = params["bldgID"];
    });
    this.rooms = this.api.getRooms(this.bldgID);
  }

  ngOnInit(): void {
  }

  routeToRoomPage(roomID: string) {
    this.router.navigate(["/campus/" + roomID]);
  }

  editRoom(r: Room | null) {
    const roomDialog = this.dialog.open(RoomDialogComponent, {data: r});

    roomDialog.afterClosed().subscribe(result => {
      if (result == "delete") {
        console.log("deleting");
      } else if (result != null) {
        this.rooms.push(result);
        this.api.setRoom(result);
      }
    });
  }

}
