import { Injectable } from '@angular/core';

export class Building {
  ID: String;
  Tags: Map<String, String>;
}

export class Room {
  ID: String;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  getBuildings(): Building[] {
    return [
      {
        ID: "ITB",
        Tags: new Map()
      },
      {
        ID: "HCEB",
        Tags: new Map()
      },
      {
        ID: "ASB",
        Tags: new Map()
      },
      {
        ID: "BYUB",
        Tags: new Map()
      },
      {
        ID: "EB",
        Tags: new Map()
      }
    ]
  }

  getRooms(bldgID: String): Room[] {
    return [
      {
        ID: "Room-1"
      },
      {
        ID: "Room-2"
      },
      {
        ID: "Room-3"
      },
      {
        ID: "Room-4"
      },
      {
        ID: "Room-5"
      },
      {
        ID: "Room-6"
      },
      {
        ID: "Room-7"
      },
      {
        ID: "Room-8"
      },
      {
        ID: "Room-9"
      }
    ]
  }
}
