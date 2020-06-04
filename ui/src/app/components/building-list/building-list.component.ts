import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Building, ApiService } from 'src/app/services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { BuildingDialogComponent } from '../building-dialog/building-dialog.component';

@Component({
  selector: 'app-building-list',
  templateUrl: './building-list.component.html',
  styleUrls: ['./building-list.component.scss']
})
export class BuildingListComponent implements OnInit {

  buildings: Building[];

  constructor(private router: Router,
    private api: ApiService,
    private dialogRef: MatDialog) { }

  ngOnInit(): void {
    this.buildings = this.api.getBuildings();
  }

  getImage(bldgID: String): String{
    return "assets/bldgImages/" + bldgID + ".jpg";
  }

  routeToRoomList(bldgID) {
    console.log(bldgID);
    this.router.navigate(["/campus/" + bldgID + "/roomList"]);
  }

  addBuilding() {
    const dialog = this.dialogRef.open(BuildingDialogComponent);

    dialog.afterClosed().subscribe(result => {
      if (result != null) {
        console.log(result.ID);
        result.Tags.forEach((value, key, map) => {
          console.log(key + " - " + value);
        });
      }
    });
  }

}
