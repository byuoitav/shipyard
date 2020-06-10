import { Injectable } from '@angular/core';

export class Building {
  ID: String;
  Tags: Map<String, String>;

  constructor(bldg: Building) {
    this.Tags = new Map();
    if (bldg != null) {
      this.ID = bldg.ID;
      bldg.Tags.forEach((value, key) => {
        this.Tags.set(key, value);
      });
    } else {
      this.ID = "";
    }
  }
}

export class Room {
  ID: String;
  Desc: String;
  Tags: Map<String, String>;

  constructor(rm: Room) {
    this.Tags = new Map();
    if (rm != null) {
      this.ID = rm.ID;
      this.Desc = rm.Desc;
      rm.Tags.forEach((value, key) => {
        this.Tags.set(key, value);
      });
    } else {
      this.ID = "";
      this.Desc = "";
    }
  }
}

export class Device {
  ID: String;
  Type: String;
  Address: String;
  Tags: Map<String, String>

  constructor(dev: Device) {
    this.Tags = new Map();
    if (dev != null) {
      this.ID = dev.ID;
      this.Type = dev.Type;
      this.Address = dev.Address;
      dev.Tags.forEach((value, key) => {
        this.Tags.set(key, value);
      });
    } else {
      this.ID = "";
      this.Type = "";
      this.Address = "";
    }
  }
}

export class DeviceTypeNode {
  Label: String;
  Icon: String;
  SubNodes: DeviceTypeNode[];
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
      Address: "Device_1.byu.edu",
      Tags: new Map().set("description", "this is device 1 blah blah blah blah blah")
    },
    {
      ID: "Device-2",
      Type: "Type-2",
      Address: "Device_2.byu.edu",
      Tags: new Map().set("description", "this is device 2")
    },
    {
      ID: "Device-3",
      Type: "Type-3",
      Address: "Device_3.byu.edu",
      Tags: new Map().set("description", "this is device 3")
    },
    {
      ID: "Device-4",
      Type: "Type-4",
      Address: "Device_4.byu.edu",
      Tags: new Map().set("description", "this is device 4")
    },
    {
      ID: "Device-5",
      Type: "Type-5",
      Address: "Device_5.byu.edu",
      Tags: new Map().set("description", "this is device 5")
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

  removeDevice(deviceID: String) {
    for (var i = 0; i < this.testDevices.length; i++) {
      if (this.testDevices[i].ID == deviceID) {
        this.testDevices.splice(i, 1);
        return;
      }
    }
  }

  getDeviceTypeMenu(): DeviceTypeNode[] {
    return [
      {
        Label: "Pis",
        Icon: "touch_app",
        SubNodes: [
          {
            Label: "AV Touchpanel",
            Icon: "",
            SubNodes: null
          },
          {
            Label: "Scheduling Panel",
            Icon: "",
            SubNodes: null
          }
        ]
      },
      {
        Label: "Displays",
        Icon: "tv",
        SubNodes: null
      },
      {
        Label: "Inputs",
        Icon: "input",
        SubNodes: null
      },
      {
        Label: "Audio",
        Icon: "mic",
        SubNodes: null
      },
      {
        Label: "Video Switchers",
        Icon: "device_hub",
        SubNodes: null
      },
      {
        Label: "Network Devices",
        Icon: "settings_ethernet",
        SubNodes: null
      }
    ]
  }
}
