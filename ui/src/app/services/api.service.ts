import { Injectable } from '@angular/core';

export class Building {
  ID: String;
  Tags: Map<String, String>;

  constructor() {
    this.ID = "";
    this.Tags = new Map();
  }
}

export class Room {
  ID: String;
  Desc: String;
  Tags: Map<String, String>;

  constructor() {
    this.ID = "";
    this.Desc = "";
    this.Tags = new Map();
  }
}

export class Device {
  ID: String;
  Type: String;
  Address: String;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  testBuildings: Building[] = [
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
  ];

  testRooms: Room[] = [
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
  ];

  testDevices: Device[] = [
    {
      ID: "Device-1",
      Type: "Type-1",
      Address: "Device_1.byu.edu"
    },
    {
      ID: "Device-2",
      Type: "Type-2",
      Address: "Device_2.byu.edu"
    },
    {
      ID: "Device-3",
      Type: "Type-3",
      Address: "Device_3.byu.edu"
    },
    {
      ID: "Device-4",
      Type: "Type-4",
      Address: "Device_4.byu.edu"
    },
    {
      ID: "Device-5",
      Type: "Type-5",
      Address: "Device_5.byu.edu"
    },
  ];

  constructor() { }

  getBuildings(): Building[] {
    return this.testBuildings;
  }

  setBuilding(bldg: Building) {
    for (let i = 0; i < this.testBuildings.length; i++) {
      if (this.testBuildings[i].ID == bldg.ID) {
        this.testBuildings[i] = bldg;
        return;
      }
    }
    this.testBuildings.push(bldg);
  }

  getRooms(bldgID: String): Room[] {
    return this.testRooms;
  }

  setRoom(room: Room) {
    console.log(room);
    for (let i = 0; i < this.testRooms.length; i++) {
      if (this.testRooms[i].ID == room.ID) {
        this.testRooms[i] = room;
        console.log(this.testRooms[i]);
        return;
      }
    }
    this.testRooms.push(room);
  }

  getDevices(roomID: String): Device[] {
    return this.testDevices;
  }

  setDevice(device: Device) {
    for (var i = 0; i < this.testDevices.length; i++) {
      if (this.testDevices[i].ID == device.ID) {
        this.testDevices[i] = device;
        return;
      }
    }
    this.testDevices.push(device);
  }
}
