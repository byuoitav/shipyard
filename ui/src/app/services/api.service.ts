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
  Desig: String;
  Desc: String;
  Notes: String;
  ProxyBaseURL: String;
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
  Desc: String;
  Address: String;
  Driver: String;
  DynamicPorts: boolean;
  Ports: Port[];
  Tags: Map<String, String>

  Type: String;

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

export class Port {
  ID: String;
  Name: String;
  Endpoint: String[];
  Incoming: boolean;
  Type: String;
}

export class RoomConfig {
  ID: String;
  ControlPanels: Map<String, String>;
  ControlGroups: Map<String, UIControlGroup>;
}

export class UIControlGroup {
  Displays: Map<String, UIDisplay>;
  Inputs: String[];
  Microphones: Map<String, String[]>;
  MasterVolume: MasterVolume;
}

export class MasterVolume {
  Device: String;
  Block: String;
}

export class UIDisplay {
  DefaultInput: String;
}

export class DeviceTypeNode {
  Label: String;
  Icon: String;
  Value: String;
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
      Desig: "designation-1",
      Desc: "this is Room-1",
      Notes: "notes on room 1",
      ProxyBaseURL: "huh...",
      Tags: new Map()
    },
    {
      ID: "Room-2",
      Desig: "designation-2",
      Desc: "this is Room-2",
      Notes: "notes on room 2",
      ProxyBaseURL: "huh...",
      Tags: new Map()
    },
    {
      ID: "Room-3",
      Desig: "designation-3",
      Desc: "this is Room-3",
      Notes: "notes on room 3",
      ProxyBaseURL: "huh...",
      Tags: new Map()
    },
    {
      ID: "Room-4",
      Desig: "designation-4",
      Desc: "this is Room-4",
      Notes: "notes on room 4",
      ProxyBaseURL: "huh...",
      Tags: new Map()
    },
    {
      ID: "Room-5",
      Desig: "designation-5",
      Desc: "this is Room-5",
      Notes: "notes on room 5",
      ProxyBaseURL: "huh...",
      Tags: new Map()
    },
    {
      ID: "Room-6",
      Desig: "designation-6",
      Desc: "this is Room-6",
      Notes: "notes on room 6",
      ProxyBaseURL: "huh...",
      Tags: new Map()
    },
    {
      ID: "Room-7",
      Desig: "designation-7",
      Desc: "this is Room-7",
      Notes: "notes on room 7",
      ProxyBaseURL: "huh...",
      Tags: new Map()
    },
    {
      ID: "Room-8",
      Desig: "designation-8",
      Desc: "this is Room-8",
      Notes: "notes on room 8",
      ProxyBaseURL: "huh...",
      Tags: new Map()
    },
    {
      ID: "Room-9",
      Desig: "designation-9",
      Desc: "this is Room-9",
      Notes: "notes on room 9",
      ProxyBaseURL: "huh...",
      Tags: new Map()
    }
  ];

  testDevices: Device[] = [
    {
      ID: "Device-1",
      Desc: "description of device 1",
      Address: "Device_1.byu.edu",
      Driver: "driver 1",
      DynamicPorts: false,
      Ports: [
        {
          ID: 'Device1-Port1',
          Name: 'Port1',
          Endpoint: [],
          Incoming: true,
          Type: ''
        },
        {
          ID: 'Device1-Port2',
          Name: 'Port2',
          Endpoint: [],
          Incoming: true,
          Type: ''
        },
        {
          ID: 'Device1-Port3',
          Name: 'Port3',
          Endpoint: ['test'],
          Incoming: true,
          Type: ''
        },
        {
          ID: 'Device1-Port4',
          Name: 'Port4',
          Endpoint: [],
          Incoming: true,
          Type: ''
        },
        {
          ID: 'Device1-Port5',
          Name: 'Port5',
          Endpoint: [],
          Incoming: true,
          Type: ''
        },
        {
          ID: 'Device1-Port6',
          Name: 'Port6',
          Endpoint: ['test'],
          Incoming: false,
          Type: ''
        },
        {
          ID: 'Device1-Port7',
          Name: 'Port7',
          Endpoint: [],
          Incoming: false,
          Type: ''
        },
        {
          ID: 'Device1-Port8',
          Name: 'Port8',
          Endpoint: ['test'],
          Incoming: false,
          Type: ''
        },
        {
          ID: 'Device1-Port9',
          Name: 'Port9',
          Endpoint: [],
          Incoming: false,
          Type: ''
        }
      ],
      Tags: new Map(),
      Type: "Type-1",
    },
    {
      ID: "Device-2",
      Desc: "description of device 2",
      Address: "Device_2.byu.edu",
      Driver: "driver 2",
      DynamicPorts: false,
      Ports: [],
      Tags: new Map(),
      Type: "Type-2",
    },
    {
      ID: "TEST-0000-MIC1",
      Desc: "description of TEST-0000-MIC1",
      Address: "TEST-0000-MIC1.byu.edu",
      Driver: "driver TEST-0000-MIC1",
      DynamicPorts: false,
      Ports: [],
      Tags: new Map(),
      Type: "???",
    },
    {
      ID: "TEST-0000-MIC2",
      Desc: "description of TEST-0000-MIC2",
      Address: "TEST-0000-MIC2.byu.edu",
      Driver: "driver TEST-0000-MIC2",
      DynamicPorts: false,
      Ports: [],
      Tags: new Map(),
      Type: "???",
    },
    {
      ID: "TEST-0000-MIC3",
      Desc: "description of TEST-0000-MIC3",
      Address: "TEST-0000-MIC3.byu.edu",
      Driver: "driver TEST-0000-MIC3",
      DynamicPorts: false,
      Ports: [],
      Tags: new Map(),
      Type: "???",
    },
    {
      ID: "TEST-0000-CP1",
      Desc: "description of TEST-0000-CP1",
      Address: "TEST-0000-CP1.byu.edu",
      Driver: "driver TEST-0000-CP1",
      DynamicPorts: false,
      Ports: [],
      Tags: new Map(),
      Type: "???",
    },
    {
      ID: "TEST-0000-CP2",
      Desc: "description of TEST-0000-CP2",
      Address: "TEST-0000-CP2.byu.edu",
      Driver: "driver TEST-0000-CP2",
      DynamicPorts: false,
      Ports: [],
      Tags: new Map(),
      Type: "???",
    },
    {
      ID: "TEST-0000-CP3",
      Desc: "description of TEST-0000-CP3",
      Address: "TEST-0000-CP3.byu.edu",
      Driver: "driver TEST-0000-CP3",
      DynamicPorts: false,
      Ports: [],
      Tags: new Map(),
      Type: "???",
    },
    {
      ID: "TEST-0000-D1",
      Desc: "description of TEST-0000-D1",
      Address: "TEST-0000-D1.byu.edu",
      Driver: "driver TEST-0000-D1",
      DynamicPorts: false,
      Ports: [],
      Tags: new Map(),
      Type: "???",
    },
    {
      ID: "TEST-0000-D2",
      Desc: "description of TEST-0000-D2",
      Address: "TEST-0000-D2.byu.edu",
      Driver: "driver TEST-0000-D2",
      DynamicPorts: false,
      Ports: [],
      Tags: new Map(),
      Type: "???",
    },
    {
      ID: "TEST-0000-D3",
      Desc: "description of TEST-0000-D3",
      Address: "TEST-0000-D3.byu.edu",
      Driver: "driver TEST-0000-D3",
      DynamicPorts: false,
      Ports: [],
      Tags: new Map(),
      Type: "???",
    }
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

  getRoom(roomID: String): Room {
    for (let i = 0; i < this.testRooms.length; i++) {
      if (this.testRooms[i].ID == roomID) {
        return this.testRooms[i];
      }
    }
    return null;
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

  addDevice(device: Device) {
    //Check if device already exists
    for (var i = 0; i < this.testDevices.length; i++) {
      if (this.testDevices[i].ID == device.ID) {
        return;
      }
    }
    //If not, add it
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
        Value: "",
        SubNodes: [
          {
            Label: "AV Touchpanel",
            Icon: "",
            Value: "Pi",
            SubNodes: null
          },
          {
            Label: "Scheduling Panel",
            Icon: "",
            Value: "Pi",
            SubNodes: null
          }
        ]
      },
      {
        Label: "Displays",
        Icon: "tv",
        Value: "Display",
        SubNodes: null
      },
      {
        Label: "Inputs",
        Icon: "input",
        Value: "Input",
        SubNodes: null
      },
      {
        Label: "Audio",
        Icon: "mic",
        Value: "Audio",
        SubNodes: null
      },
      {
        Label: "Video Switchers",
        Icon: "device_hub",
        Value: "Video Switcher",
        SubNodes: null
      },
      {
        Label: "Network Devices",
        Icon: "settings_ethernet",
        Value: "Network Device",
        SubNodes: null
      }
    ]
  }

  getRoomConfig(): RoomConfig {
    return {
      ID: "Test",
      ControlPanels: null,
      ControlGroups: new Map([
        ["Group-1",{
          Displays: new Map(),
          Inputs: [],
          Microphones: null,
          MasterVolume: null
        }],
        ["Group-2",{
          Displays: new Map(),
          Inputs: [],
          Microphones: null,
          MasterVolume: null
        }],
        ["Group-3",{
          Displays: new Map(),
          Inputs: [],
          Microphones: null,
          MasterVolume: null
        }]
      ])
    }
  }
}
