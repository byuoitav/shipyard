import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
// import { RoomDialogComponent } from '../room-dialog/room-dialog.component';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit {
  rooms: string[] = [];
  filteredRooms: string[] = [];
  filterParam: string = "";

  constructor(private route: ActivatedRoute,
    private router: Router,
    private api: ApiService) {
  }

  ngOnInit(): void {
    // this.rooms = this.route.snapshot.data.rooms; // resolver loads data before page load
    this.rooms = this.api.getRooms();
    this.filterRooms();
  }

  routeToRoomPage(roomID: string) {
    this.router.navigate(["/room-config/" + roomID]);
  }

  filterRooms() {
    this.filteredRooms = [];
    let re = new RegExp(this.filterParam.toLowerCase());
    this.rooms.forEach(rm => {
      if (re.exec(rm.toLowerCase()) != null) {
        this.filteredRooms.push(rm);
      }
    });
  }
}
