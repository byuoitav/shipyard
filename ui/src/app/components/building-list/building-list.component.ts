import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { BuildingDialogComponent } from '../building-dialog/building-dialog.component';

@Component({
  selector: 'app-building-list',
  templateUrl: './building-list.component.html',
  styleUrls: ['./building-list.component.scss']
})
export class BuildingListComponent implements OnInit {

  buildings: String[] = [];

  constructor(private router: Router,
    private api: ApiService,
    private dialogRef: MatDialog) { }

  ngOnInit(): void {
    this.genBuildingList();
  }

  genBuildingList() {
    let rooms = this.api.getRooms("");
    let re = new RegExp('[a-zA-Z0-9]*-');
    for (var i = 0; i < rooms.length; i++) {
      let matches = re.exec(rooms[i].ID.toString());
      let bldgName = matches[0].substr(0, matches[0].length - 1);
      this.addBuilding(bldgName);
    }
  }

  addBuilding(id: String) {
    for (var i = 0; i < this.buildings.length; i++) {
      if (id == this.buildings[i]) {
        return;
      }
    }
    this.buildings.push(id);
  }

  removeBuilding(id: String) {
    for (var i = 0; i < this.buildings.length; i++) {
      if (id == this.buildings[i]) {
        this.buildings.splice(i, 1);
        return;
      }
    }
  }

  getImage(bldgID: String): String{
    return "assets/bldgImages/" + bldgID + ".jpg";
  }

  routeToRoomList(bldgID) {
    console.log(bldgID);
    this.router.navigate(["/campus/" + bldgID + "/roomList"]);
  }

  editBuilding(bldg: String) {
    const dialog = this.dialogRef.open(BuildingDialogComponent, {
      data: bldg
    });

    dialog.afterClosed().subscribe(result => {
      if (result != null) {
        if (result) {
          this.addBuilding(bldg);
        } else {
          this.removeBuilding(bldg);
        }
      }
    });
  }

}
