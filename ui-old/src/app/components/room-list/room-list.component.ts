import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { RoomDialogComponent } from '../room-dialog/room-dialog.component';
import { ApiProxyService } from 'src/app/services/api-proxy.service';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit {
  rooms: String[] = []; // Room list will actually be an array of strings
  filteredRooms: String[];
  filterParam: string;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private proxy: ApiProxyService,
    private api: ApiService,
    private dialog: MatDialog) {
  }

  ngOnInit(): void {
    // this.rooms = this.route.snapshot.data.rooms;
    this.rooms = this.api.getRooms();
    this.filterParam = "";
    this.filterRooms();
  }

  routeToRoomPage(roomID: String) {
    this.router.navigate(["/campus/" + roomID]);
  }

  editRoom(r: String) {
    // let room = this.proxy.getRoom(r);
    let room = this.api.getRoom(r);
    const roomDialog = this.dialog.open(RoomDialogComponent, {data: room});

    roomDialog.afterClosed().subscribe(result => {
      if (result == "delete") {
        console.log("deleting");
      } else if (result != null) {
        this.rooms.push(result);
        this.proxy.saveRoom(result);
      }
    });
  }

  filterRooms() {
    this.filteredRooms = [];
    let re = new RegExp(this.filterParam.toLowerCase());
    this.rooms.forEach(rm => {
      if (re.exec(rm.toString().toLowerCase()) != null) {
        this.filteredRooms.push(rm);
      }
    });
  }
}
