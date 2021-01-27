import { Injectable } from '@angular/core';
import { Device } from 'src/app/components/room-page/devices/device';
import { RoomConfig } from '../components/room-page/ui-config/ui-config';
import { DeviceTypeNode } from '../components/room-page/devices/device-type-menu';
import { Room } from '../components/room-page/room';

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
      id: "ASB-TEST",
      designation: "designation ASB-TEST",
      publicDescription: "this is ASB-TEST",
      privateDescription: "notes on ASB-TEST",
      proxyBaseURL: "huh...",
      tags: new Map()
    },
    {
      id: "BYUB-TEST",
      designation: "designation BYUB-TEST",
      publicDescription: "this is BYUB-TEST",
      privateDescription: "notes on BYUB-TEST",
      proxyBaseURL: "huh...",
      tags: new Map()
    },
    {
      id: "EB-TEST",
      designation: "designation EB-TEST",
      publicDescription: "this is EB-TEST",
      privateDescription: "notes on EB-TEST",
      proxyBaseURL: "huh...",
      tags: new Map()
    },
    {
      id: "HBLL-TEST",
      designation: "designation HBLL-TEST",
      publicDescription: "this is HBLL-TEST",
      privateDescription: "notes on HBLL-TEST",
      proxyBaseURL: "huh...",
      tags: new Map()
    },
    {
      id: "ITB-TEST",
      designation: "designation ITB-TEST",
      publicDescription: "this is ITB-TEST",
      privateDescription: "notes on ITB-TEST",
      proxyBaseURL: "huh...",
      tags: new Map()
    },
    {
      id: "ITB-TEST2",
      designation: "designation ITB-TEST2",
      publicDescription: "this is ITB-TEST2",
      privateDescription: "notes on ITB-TEST2",
      proxyBaseURL: "huh...",
      tags: new Map()
    },
    {
      id: "ITB-TEST3",
      designation: "designation ITB-TEST3",
      publicDescription: "this is ITB-TEST3",
      privateDescription: "notes on ITB-TEST3",
      proxyBaseURL: "huh...",
      tags: new Map()
    },
    {
      id: "JFSB-TEST",
      designation: "designation JFSB-TEST",
      publicDescription: "this is JFSB-TEST",
      privateDescription: "notes on JFSB-TEST",
      proxyBaseURL: "huh...",
      tags: new Map()
    },
    {
      id: "KMBL-TEST",
      designation: "designation KMBL-TEST",
      publicDescription: "this is KMBL-TEST",
      privateDescription: "notes on KMBL-TEST",
      proxyBaseURL: "huh...",
      tags: new Map()
    },
    {
      id: "MARB-TEST",
      designation: "designation MARB-TEST",
      publicDescription: "this is MARB-TEST",
      privateDescription: "notes on MARB-TEST",
      proxyBaseURL: "huh...",
      tags: new Map()
    },
    {
      id: "TMCB-TEST",
      designation: "designation TMCB-TEST",
      publicDescription: "this is TMCB-TEST",
      privateDescription: "notes on TMCB-TEST",
      proxyBaseURL: "huh...",
      tags: new Map()
    }
  ];

  testDevices: Device[] = [
    {
      id: "Device-1",
      publicDescription: "description of device 1",
      address: "Device_1.byu.edu",
      driver: "driver 1",
      dynamicPorts: false,
      ports: [
        {
          id: 'Port1',
          name: 'Port1',
          endpoint: [],
          incoming: true,
          type: ''
        },
        {
          id: 'Port2',
          name: 'Port2',
          endpoint: [],
          incoming: true,
          type: ''
        },
        {
          id: 'Port3',
          name: 'Port3',
          endpoint: [
            {
              device: 'Device-2',
              port: 'Port6'
            }
          ],
          incoming: true,
          type: ''
        },
        {
          id: 'Port4',
          name: 'Port4',
          endpoint: [],
          incoming: true,
          type: ''
        },
        {
          id: 'Port5',
          name: 'Port5',
          endpoint: [],
          incoming: true,
          type: ''
        },
        {
          id: 'Port6',
          name: 'Port6',
          endpoint: [],
          incoming: false,
          type: ''
        },
        {
          id: 'Port7',
          name: 'Port7',
          endpoint: [],
          incoming: false,
          type: ''
        },
        {
          id: 'Port8',
          name: 'Port8',
          endpoint: [],
          incoming: false,
          type: ''
        },
        {
          id: 'Port9',
          name: 'Port9',
          endpoint: [],
          incoming: false,
          type: ''
        }
      ],
      tags: new Map(),
      Type: "Type-1",
    },
    {
      id: "Device-2",
      publicDescription: "description of device 2",
      address: "Device_2.byu.edu",
      driver: "driver 2",
      dynamicPorts: false,
      ports: [
        {
          id: 'Port1',
          name: 'Port1',
          endpoint: [],
          incoming: true,
          type: ''
        },
        {
          id: 'Port2',
          name: 'Port2',
          endpoint: [],
          incoming: true,
          type: ''
        },
        {
          id: 'Port3',
          name: 'Port3',
          endpoint: [],
          incoming: true,
          type: ''
        },
        {
          id: 'Port4',
          name: 'Port4',
          endpoint: [],
          incoming: true,
          type: ''
        },
        {
          id: 'Port5',
          name: 'Port5',
          endpoint: [],
          incoming: true,
          type: ''
        },
        {
          id: 'Port6',
          name: 'Port6',
          endpoint: [
            {
              device: 'Device-1',
              port: 'Port3'
            }
          ],
          incoming: false,
          type: ''
        },
        {
          id: 'Port7',
          name: 'Port7',
          endpoint: [],
          incoming: false,
          type: ''
        },
        {
          id: 'Port8',
          name: 'Port8',
          endpoint: [],
          incoming: false,
          type: ''
        },
        {
          id: 'Port9',
          name: 'Port9',
          endpoint: [],
          incoming: false,
          type: ''
        }
      ],
      tags: new Map(),
      Type: "Type-2",
    },
    {
      id: "TEST-0000-MIC1",
      publicDescription: "description of TEST-0000-MIC1",
      address: "TEST-0000-MIC1.byu.edu",
      driver: "driver TEST-0000-MIC1",
      dynamicPorts: false,
      ports: [],
      tags: new Map(),
      Type: "???",
    },
    {
      id: "TEST-0000-MIC2",
      publicDescription: "description of TEST-0000-MIC2",
      address: "TEST-0000-MIC2.byu.edu",
      driver: "driver TEST-0000-MIC2",
      dynamicPorts: false,
      ports: [],
      tags: new Map(),
      Type: "???",
    },
    {
      id: "TEST-0000-MIC3",
      publicDescription: "description of TEST-0000-MIC3",
      address: "TEST-0000-MIC3.byu.edu",
      driver: "driver TEST-0000-MIC3",
      dynamicPorts: false,
      ports: [],
      tags: new Map(),
      Type: "???",
    },
    {
      id: "TEST-0000-CP1",
      publicDescription: "description of TEST-0000-CP1",
      address: "TEST-0000-CP1.byu.edu",
      driver: "driver TEST-0000-CP1",
      dynamicPorts: false,
      ports: [],
      tags: new Map(),
      Type: "???",
    },
    {
      id: "TEST-0000-CP2",
      publicDescription: "description of TEST-0000-CP2",
      address: "TEST-0000-CP2.byu.edu",
      driver: "driver TEST-0000-CP2",
      dynamicPorts: false,
      ports: [],
      tags: new Map(),
      Type: "???",
    },
    {
      id: "TEST-0000-CP3",
      publicDescription: "description of TEST-0000-CP3",
      address: "TEST-0000-CP3.byu.edu",
      driver: "driver TEST-0000-CP3",
      dynamicPorts: false,
      ports: [],
      tags: new Map(),
      Type: "???",
    },
    {
      id: "TEST-0000-D1",
      publicDescription: "description of TEST-0000-D1",
      address: "TEST-0000-D1.byu.edu",
      driver: "driver TEST-0000-D1",
      dynamicPorts: false,
      ports: [],
      tags: new Map(),
      Type: "???",
    },
    {
      id: "TEST-0000-D2",
      publicDescription: "description of TEST-0000-D2",
      address: "TEST-0000-D2.byu.edu",
      driver: "driver TEST-0000-D2",
      dynamicPorts: false,
      ports: [],
      tags: new Map(),
      Type: "???",
    },
    {
      id: "TEST-0000-D3",
      publicDescription: "description of TEST-0000-D3",
      address: "TEST-0000-D3.byu.edu",
      driver: "driver TEST-0000-D3",
      dynamicPorts: false,
      ports: [],
      tags: new Map(),
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

  getRoom(roomid: String): Room {
    for (let i = 0; i < this.testRooms.length; i++) {
      if (this.testRooms[i].id == roomid) {
        return this.testRooms[i];
      }
    }
    return null;
  }

  setRoom(room: Room) {
    console.log(room);
    for (let i = 0; i < this.testRooms.length; i++) {
      if (this.testRooms[i].id == room.id) {
        this.testRooms[i] = room;
        console.log(this.testRooms[i]);
        return;
      }
    }
    this.testRooms.push(room);
  }

  getDevices(roomid: String): Device[] {
    return this.testDevices;
  }

  addDevice(device: Device) {
    //Check if device already exists
    for (var i = 0; i < this.testDevices.length; i++) {
      if (this.testDevices[i].id == device.id) {
        return;
      }
    }
    //If not, add it
    this.testDevices.push(device);
  }

  removeDevice(deviceid: String) {
    for (var i = 0; i < this.testDevices.length; i++) {
      if (this.testDevices[i].id == deviceid) {
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
