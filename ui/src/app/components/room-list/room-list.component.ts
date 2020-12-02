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
  rooms: Room[];
  filteredRooms: Room[];
  filterParam: string;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    private dialog: MatDialog) {
    this.rooms = this.api.getRooms();
    this.filterParam = "";
    this.filterRooms();
  }

  ngOnInit(): void {
  }

  routeToRoomPage(roomID: String) {
    this.router.navigate(["/campus/" + roomID]);
  }

  editRoom(r: Room) {
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

  filterRooms() {
    console.log(this.filterParam)
    this.filteredRooms = [];
    let re = new RegExp(this.filterParam.toLowerCase());
    this.rooms.forEach(rm => {
      if (re.exec(rm.ID.toString().toLowerCase()) != null) {
        this.filteredRooms.push(rm);
      }
    });
  }
}
