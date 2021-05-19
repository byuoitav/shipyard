import { Injectable } from '@angular/core';
import { Device } from './device';
// import { RoomConfig } from '../components/room-page/ui-config/ui-config';
import { Room } from './room';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  testRoomList: string[] = [
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
          endpoints: [],
          incoming: true,
          type: ''
        },
        {
          id: 'Port2',
          name: 'Port2',
          endpoints: [],
          incoming: true,
          type: ''
        },
        {
          id: 'Port3',
          name: 'Port3',
          endpoints: [
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
          endpoints: [],
          incoming: true,
          type: ''
        },
        {
          id: 'Port5',
          name: 'Port5',
          endpoints: [],
          incoming: true,
          type: ''
        },
        {
          id: 'Port6',
          name: 'Port6',
          endpoints: [],
          incoming: false,
          type: ''
        },
        {
          id: 'Port7',
          name: 'Port7',
          endpoints: [],
          incoming: false,
          type: ''
        },
        {
          id: 'Port8',
          name: 'Port8',
          endpoints: [],
          incoming: false,
          type: ''
        },
        {
          id: 'Port9',
          name: 'Port9',
          endpoints: [],
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
          endpoints: [],
          incoming: true,
          type: ''
        },
        {
          id: 'Port2',
          name: 'Port2',
          endpoints: [],
          incoming: true,
          type: ''
        },
        {
          id: 'Port3',
          name: 'Port3',
          endpoints: [],
          incoming: true,
          type: ''
        },
        {
          id: 'Port4',
          name: 'Port4',
          endpoints: [],
          incoming: true,
          type: ''
        },
        {
          id: 'Port5',
          name: 'Port5',
          endpoints: [],
          incoming: true,
          type: ''
        },
        {
          id: 'Port6',
          name: 'Port6',
          endpoints: [
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
          endpoints: [],
          incoming: false,
          type: ''
        },
        {
          id: 'Port8',
          name: 'Port8',
          endpoints: [],
          incoming: false,
          type: ''
        },
        {
          id: 'Port9',
          name: 'Port9',
          endpoints: [],
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

  getRooms(): string[] {
    // let rooms = [];
    // this.testRoomList.forEach(r => {
    //   for (let i = 0; i < 300; i++) {
    //     rooms.push(r);
    //   }
    // });
    // return rooms;
    return this.testRoomList;
  }

  getRoom(roomid: string): Room {
    for (let i = 0; i < this.testRooms.length; i++) {
      if (this.testRooms[i].id == roomid) {
        return this.testRooms[i];
      }
    }
    return null as any;
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

  getDevices(roomid: string): Device[] {
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

  removeDevice(deviceid: string) {
    for (var i = 0; i < this.testDevices.length; i++) {
      if (this.testDevices[i].id == deviceid) {
        this.testDevices.splice(i, 1);
        return;
      }
    }
  }

  // getDeviceTypeMenu(): DeviceTypeNode[] {
  //   return [
  //     {
  //       label: "Pis",
  //       icon: "touch_app",
  //       value: "",
  //       subNodes: [
  //         {
  //           label: "AV Touchpanel",
  //           icon: "",
  //           value: "Pi",
  //           subNodes: []
  //         },
  //         {
  //           label: "Scheduling Panel",
  //           icon: "",
  //           value: "Pi",
  //           subNodes: []
  //         }
  //       ]
  //     },
  //     {
  //       label: "Displays",
  //       icon: "tv",
  //       value: "Display",
  //       subNodes: []
  //     },
  //     {
  //       label: "Inputs",
  //       icon: "input",
  //       value: "Input",
  //       subNodes: []
  //     },
  //     {
  //       label: "Audio",
  //       icon: "mic",
  //       value: "Audio",
  //       subNodes: []
  //     },
  //     {
  //       label: "Video Switchers",
  //       icon: "device_hub",
  //       value: "Video Switcher",
  //       subNodes: []
  //     },
  //     {
  //       label: "Network Devices",
  //       icon: "settings_ethernet",
  //       value: "Network Device",
  //       subNodes: []
  //     }
  //   ]
  // }

  // getRoomConfig(): RoomConfig {
  //   return {
  //     id: "Test",
  //     controlPanels: new Map(),
  //     controlGroups: new Map([
  //       ["Layout 1",{
  //         displays: new Map(),
  //         inputs: [],
  //         microphones: new Map(),
  //         masterVolume: {
  //           device: "Test",
  //           block: ""
  //         }
  //       }],
  //       ["Layout 2",{
  //         displays: new Map(),
  //         inputs: [],
  //         microphones: new Map(),
  //         masterVolume: {
  //           device: "Test",
  //           block: ""
  //         }
  //       }],
  //       ["Layout 3",{
  //         displays: new Map(),
  //         inputs: [],
  //         microphones: new Map(),
  //         masterVolume: {
  //           device: "Test",
  //           block: ""
  //         }
  //       }]
  //     ])
  //   }
  // }
}
