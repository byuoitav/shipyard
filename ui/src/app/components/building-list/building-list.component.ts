import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-building-list',
  templateUrl: './building-list.component.html',
  styleUrls: ['./building-list.component.scss']
})
export class BuildingListComponent implements OnInit {

  buildings: String[] = [
    "ITB",
    "HCEB"
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  getImage(bldgID: String): String{
    return "assets/bldgImages/" + bldgID + ".jpg";
  }

  routeToRoomList(bldgID) {
    console.log(bldgID);
    this.router.navigate(["/campus/" + bldgID + "/roomList"]);
  }

}
