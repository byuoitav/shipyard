import { Injectable } from '@angular/core';
import { Room } from 'src/app/components/room-page/room-page.component';
import { Port } from '../components/room-page/ports/ports.component';

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

  testRoomList: String[] = [
    "ASB-TEST",
    "BYUB-TEST",
    "EB-TEST",
    "HBLL-TEST",
    "ITB-TEST",
    "ITB-TEST2",
    "ITB-TEST3",
    "JFSB-TEST",
    "KMBL-TEST",
    "MARB-TEST",
    "TMCB-TEST"
  ];

  testRooms: Room[] = [
    {
      ID: "ASB-TEST",
      Desig: "designation ASB-TEST",
      PublicDesc: "this is ASB-TEST",
      PrivateDesc: "notes on ASB-TEST",
      ProxyBaseURL: "huh...",
      Tags: new Map()
    },
    {
      ID: "BYUB-TEST",
      Desig: "designation BYUB-TEST",
      PublicDesc: "this is BYUB-TEST",
      PrivateDesc: "notes on BYUB-TEST",
      ProxyBaseURL: "huh...",
      Tags: new Map()
    },
    {
      ID: "EB-TEST",
      Desig: "designation EB-TEST",
      PublicDesc: "this is EB-TEST",
      PrivateDesc: "notes on EB-TEST",
      ProxyBaseURL: "huh...",
      Tags: new Map()
    },
    {
      ID: "HBLL-TEST",
      Desig: "designation HBLL-TEST",
      PublicDesc: "this is HBLL-TEST",
      PrivateDesc: "notes on HBLL-TEST",
      ProxyBaseURL: "huh...",
      Tags: new Map()
    },
    {
      ID: "ITB-TEST",
      Desig: "designation ITB-TEST",
      PublicDesc: "this is ITB-TEST",
      PrivateDesc: "notes on ITB-TEST",
      ProxyBaseURL: "huh...",
      Tags: new Map()
    },
    {
      ID: "ITB-TEST2",
      Desig: "designation ITB-TEST2",
      PublicDesc: "this is ITB-TEST2",
      PrivateDesc: "notes on ITB-TEST2",
      ProxyBaseURL: "huh...",
      Tags: new Map()
    },
    {
      ID: "ITB-TEST3",
      Desig: "designation ITB-TEST3",
      PublicDesc: "this is ITB-TEST3",
      PrivateDesc: "notes on ITB-TEST3",
      ProxyBaseURL: "huh...",
      Tags: new Map()
    },
    {
      ID: "JFSB-TEST",
      Desig: "designation JFSB-TEST",
      PublicDesc: "this is JFSB-TEST",
      PrivateDesc: "notes on JFSB-TEST",
      ProxyBaseURL: "huh...",
      Tags: new Map()
    },
    {
      ID: "KMBL-TEST",
      Desig: "designation KMBL-TEST",
      PublicDesc: "this is KMBL-TEST",
      PrivateDesc: "notes on KMBL-TEST",
      ProxyBaseURL: "huh...",
      Tags: new Map()
    },
    {
      ID: "MARB-TEST",
      Desig: "designation MARB-TEST",
      PublicDesc: "this is MARB-TEST",
      PrivateDesc: "notes on MARB-TEST",
      ProxyBaseURL: "huh...",
      Tags: new Map()
    },
    {
      ID: "TMCB-TEST",
      Desig: "designation TMCB-TEST",
      PublicDesc: "this is TMCB-TEST",
      PrivateDesc: "notes on TMCB-TEST",
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
          ID: 'Port1',
          Name: 'Port1',
          Endpoints: [],
          Incoming: true,
          Type: ''
        },
        {
          ID: 'Port2',
          Name: 'Port2',
          Endpoints: [],
          Incoming: true,
          Type: ''
        },
        {
          ID: 'Port3',
          Name: 'Port3',
          Endpoints: [
            {
              Device: 'Device-2',
              Port: 'Port6'
            }
          ],
          Incoming: true,
          Type: ''
        },
        {
          ID: 'Port4',
          Name: 'Port4',
          Endpoints: [],
          Incoming: true,
          Type: ''
        },
        {
          ID: 'Port5',
          Name: 'Port5',
          Endpoints: [],
          Incoming: true,
          Type: ''
        },
        {
          ID: 'Port6',
          Name: 'Port6',
          Endpoints: [],
          Incoming: false,
          Type: ''
        },
        {
          ID: 'Port7',
          Name: 'Port7',
          Endpoints: [],
          Incoming: false,
          Type: ''
        },
        {
          ID: 'Port8',
          Name: 'Port8',
          Endpoints: [],
          Incoming: false,
          Type: ''
        },
        {
          ID: 'Port9',
          Name: 'Port9',
          Endpoints: [],
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
      Ports: [
        {
          ID: 'Port1',
          Name: 'Port1',
          Endpoints: [],
          Incoming: true,
          Type: ''
        },
        {
          ID: 'Port2',
          Name: 'Port2',
          Endpoints: [],
          Incoming: true,
          Type: ''
        },
        {
          ID: 'Port3',
          Name: 'Port3',
          Endpoints: [],
          Incoming: true,
          Type: ''
        },
        {
          ID: 'Port4',
          Name: 'Port4',
          Endpoints: [],
          Incoming: true,
          Type: ''
        },
        {
          ID: 'Port5',
          Name: 'Port5',
          Endpoints: [],
          Incoming: true,
          Type: ''
        },
        {
          ID: 'Port6',
          Name: 'Port6',
          Endpoints: [
            {
              Device: 'Device-1',
              Port: 'Port3'
            }
          ],
          Incoming: false,
          Type: ''
        },
        {
          ID: 'Port7',
          Name: 'Port7',
          Endpoints: [],
          Incoming: false,
          Type: ''
        },
        {
          ID: 'Port8',
          Name: 'Port8',
          Endpoints: [],
          Incoming: false,
          Type: ''
        },
        {
          ID: 'Port9',
          Name: 'Port9',
          Endpoints: [],
          Incoming: false,
          Type: ''
        }
      ],
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

  getRooms(): String[] {
    // let rooms = [];
    // this.testRoomList.forEach(r => {
    //   for (let i = 0; i < 300; i++) {
    //     rooms.push(r);
    //   }
    // });
    // return rooms;
    return this.testRoomList;
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
      ControlPanels: new Map(),
      ControlGroups: new Map([
        ["Layout 1",{
          Displays: new Map(),
          Inputs: [],
          Microphones: new Map(),
          MasterVolume: {
            Device: "Test",
            Block: ""
          }
        }],
        ["Layout 2",{
          Displays: new Map(),
          Inputs: [],
          Microphones: new Map(),
          MasterVolume: {
            Device: "Test",
            Block: ""
          }
        }],
        ["Layout 3",{
          Displays: new Map(),
          Inputs: [],
          Microphones: new Map(),
          MasterVolume: {
            Device: "Test",
            Block: ""
          }
        }]
      ])
    }
  }
}
