import { Injectable } from '@angular/core';

export class Building {
  ID: String;
  Tags: Map<String, String>;
}

export class Room {
  ID: String;
  Desc: String;
  Tags: Map<String, String>;
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
        ID: "Room-1",
        Desc: "this is Room-1",
        Tags: new Map()
      },
      {
        ID: "Room-2",
        Desc: "this is Room-2",
        Tags: new Map()
      },
      {
        ID: "Room-3",
        Desc: "this is Room-3",
        Tags: new Map()
      },
      {
        ID: "Room-4",
        Desc: "this is Room-4",
        Tags: new Map()
      },
      {
        ID: "Room-5",
        Desc: "this is Room-5",
        Tags: new Map()
      },
      {
        ID: "Room-6",
        Desc: "this is Room-6",
        Tags: new Map()
      },
      {
        ID: "Room-7",
        Desc: "this is Room-7",
        Tags: new Map()
      },
      {
        ID: "Room-8",
        Desc: "this is Room-8",
        Tags: new Map()
      },
      {
        ID: "Room-9",
        Desc: "this is Room-9",
        Tags: new Map()
      }
    ]
  }
}
