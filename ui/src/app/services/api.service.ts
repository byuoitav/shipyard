import { Injectable } from '@angular/core';
import { Device } from './device';
// import { RoomConfig } from '../components/room-page/ui-config/ui-config';
import { Room } from './room';
import { System } from './system';
import { SystemUIConfig } from './ui-config';

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
      id: 1,
      name: "Device 1",
      roomID: 12,
      modelID: 12,
      installDate: new Date(),
      warrantyDate: new Date(),
      location: "in a cupboard under the stairs",
      serialNumber: "asdf",
      icon: "smart_toy",
      fundingType: "Type 1",
      proxyBaseURL: "",
      notes: "these are notes on Device 1",
      address: "Device_1.byu.edu",
      presets: new Map(),
      ports: [
        {
          id: 'Port1',
          name: 'Port1',
          endpoints: [],
          direction: 'incoming',
          type: ''
        },
        {
          id: 'Port2',
          name: 'Port2',
          endpoints: [],
          direction: 'incoming',
          type: ''
        },
        {
          id: 'Port3',
          name: 'Port3',
          endpoints: [
            {
              device: 'Device 2',
              port: 'Port6'
            }
          ],
          direction: 'incoming',
          type: ''
        },
        {
          id: 'Port4',
          name: 'Port4',
          endpoints: [],
          direction: 'incoming',
          type: ''
        },
        {
          id: 'Port5',
          name: 'Port5',
          endpoints: [],
          direction: 'incoming',
          type: ''
        },
        {
          id: 'Port6',
          name: 'Port6',
          endpoints: [],
          direction: 'outgoing',
          type: ''
        },
        {
          id: 'Port7',
          name: 'Port7',
          endpoints: [],
          direction: 'outgoing',
          type: ''
        },
        {
          id: 'Port8',
          name: 'Port8',
          endpoints: [],
          direction: 'outgoing',
          type: ''
        },
        {
          id: 'Port9',
          name: 'Port9',
          endpoints: [],
          direction: 'outgoing',
          type: ''
        }
      ],
      systemIDs: [1,2,3],
      tags: new Map(),
    },
    {
      id: 2,
      name: "Device 2",
      roomID: 12,
      modelID: 12,
      installDate: new Date(),
      warrantyDate: new Date(),
      location: "in a cupboard under the stairs",
      serialNumber: "asdf",
      icon: "smart_toy",
      fundingType: "Type 1",
      proxyBaseURL: "",
      notes: "these are notes on Device 2",
      address: "Device_2.byu.edu",
      presets: new Map(),
      ports: [
        {
          id: 'Port1',
          name: 'Port1',
          endpoints: [],
          direction: 'incoming',
          type: ''
        },
        {
          id: 'Port2',
          name: 'Port2',
          endpoints: [],
          direction: 'incoming',
          type: ''
        },
        {
          id: 'Port3',
          name: 'Port3',
          endpoints: [],
          direction: 'incoming',
          type: ''
        },
        {
          id: 'Port4',
          name: 'Port4',
          endpoints: [],
          direction: 'incoming',
          type: ''
        },
        {
          id: 'Port5',
          name: 'Port5',
          endpoints: [],
          direction: 'incoming',
          type: ''
        },
        {
          id: 'Port6',
          name: 'Port6',
          endpoints: [
            {
              device: 'Device 1',
              port: 'Port3'
            }
          ],
          direction: 'outgoing',
          type: ''
        },
        {
          id: 'Port7',
          name: 'Port7',
          endpoints: [],
          direction: 'outgoing',
          type: ''
        },
        {
          id: 'Port8',
          name: 'Port8',
          endpoints: [],
          direction: 'outgoing',
          type: ''
        },
        {
          id: 'Port9',
          name: 'Port9',
          endpoints: [],
          direction: 'outgoing',
          type: ''
        }
      ],
      systemIDs: [4,5,6],
      tags: new Map(),
    },
    {
      id: 3,
      name: "TEST-0000-MIC1",
      roomID: 12,
      modelID: 12,
      installDate: new Date(),
      warrantyDate: new Date(),
      location: "in a cupboard under the stairs",
      serialNumber: "asdf",
      icon: "mic",
      fundingType: "Type 1",
      proxyBaseURL: "",
      notes: "these are notes on TEST-0000-MIC1",
      address: "TEST-0000-MIC1.byu.edu",
      presets: new Map(),
      ports: [],
      systemIDs: [1],
      tags: new Map()
    },
    {
      id: 4,
      name: "TEST-0000-MIC2",
      roomID: 12,
      modelID: 12,
      installDate: new Date(),
      warrantyDate: new Date(),
      location: "in a cupboard under the stairs",
      serialNumber: "asdf",
      icon: "mic",
      fundingType: "Type 1",
      proxyBaseURL: "",
      notes: "these are notes on TEST-0000-MIC2",
      address: "TEST-0000-MIC2.byu.edu",
      presets: new Map(),
      ports: [],
      systemIDs: [2],
      tags: new Map()
    },
    {
      id: 5,
      name: "TEST-0000-MIC3",
      roomID: 12,
      modelID: 12,
      installDate: new Date(),
      warrantyDate: new Date(),
      location: "in a cupboard under the stairs",
      serialNumber: "asdf",
      icon: "mic",
      fundingType: "Type 1",
      proxyBaseURL: "",
      notes: "these are notes on TEST-0000-MIC3",
      address: "TEST-0000-MIC3.byu.edu",
      presets: new Map(),
      ports: [],
      systemIDs: [3],
      tags: new Map()
    },
    {
      id: 6,
      name: "TEST-0000-CP1",
      roomID: 12,
      modelID: 12,
      installDate: new Date(),
      warrantyDate: new Date(),
      location: "in a cupboard under the stairs",
      serialNumber: "asdf",
      icon: "tablet",
      fundingType: "Type 1",
      proxyBaseURL: "",
      notes: "these are notes on TEST-0000-CP1",
      address: "TEST-0000-CP1.byu.edu",
      presets: new Map(),
      ports: [],
      systemIDs: [4],
      tags: new Map()
    },
    {
      id: 7,
      name: "TEST-0000-CP2",
      roomID: 12,
      modelID: 12,
      installDate: new Date(),
      warrantyDate: new Date(),
      location: "in a cupboard under the stairs",
      serialNumber: "asdf",
      icon: "tablet",
      fundingType: "Type 1",
      proxyBaseURL: "",
      notes: "these are notes on TEST-0000-CP2",
      address: "TEST-0000-CP2.byu.edu",
      presets: new Map(),
      ports: [],
      systemIDs: [5],
      tags: new Map()
    },
    {
      id: 8,
      name: "TEST-0000-CP3",
      roomID: 12,
      modelID: 12,
      installDate: new Date(),
      warrantyDate: new Date(),
      location: "in a cupboard under the stairs",
      serialNumber: "asdf",
      icon: "tablet",
      fundingType: "Type 1",
      proxyBaseURL: "",
      notes: "these are notes on TEST-0000-CP3",
      address: "TEST-0000-CP3.byu.edu",
      presets: new Map(),
      ports: [],
      systemIDs: [6],
      tags: new Map()
    },
    {
      id: 9,
      name: "TEST-0000-D1",
      roomID: 12,
      modelID: 12,
      installDate: new Date(),
      warrantyDate: new Date(),
      location: "in a cupboard under the stairs",
      serialNumber: "asdf",
      icon: "monitor",
      fundingType: "Type 1",
      proxyBaseURL: "",
      notes: "these are notes on TEST-0000-D1",
      address: "TEST-0000-D1.byu.edu",
      presets: new Map(),
      ports: [],
      systemIDs: [7],
      tags: new Map()
    },
    {
      id: 10,
      name: "TEST-0000-D2",
      roomID: 12,
      modelID: 12,
      installDate: new Date(),
      warrantyDate: new Date(),
      location: "in a cupboard under the stairs",
      serialNumber: "asdf",
      icon: "monitor",
      fundingType: "Type 1",
      proxyBaseURL: "",
      notes: "these are notes on TEST-0000-D2",
      address: "TEST-0000-D2.byu.edu",
      presets: new Map(),
      ports: [],
      systemIDs: [6],
      tags: new Map()
    },
    {
      id: 11,
      name: "TEST-0000-D3",
      roomID: 12,
      modelID: 12,
      installDate: new Date(),
      warrantyDate: new Date(),
      location: "in a cupboard under the stairs",
      serialNumber: "asdf",
      icon: "monitor",
      fundingType: "Type 1",
      proxyBaseURL: "",
      notes: "these are notes on TEST-0000-D3",
      address: "TEST-0000-D3.byu.edu",
      presets: new Map(),
      ports: [],
      systemIDs: [5],
      tags: new Map()
    }
  ];

  testSystems: System[] = [
    {
      id: 1,
      name: "Test System 1",
      designation: "Designation 1",
      installDate: new Date("1820-04-01T00:00:00-0700"),
      checkDate: new Date("1830-04-06T00:00:00-0700"),
    },
    {
      id: 2,
      name: "Test System 2",
      designation: "Designation 2",
      installDate: new Date("1820-04-01T00:00:00-0700"),
      checkDate: new Date("1830-04-06T00:00:00-0700"),
    },
    {
      id: 3,
      name: "Test System 3",
      designation: "Designation 3",
      installDate: new Date("1820-04-01T00:00:00-0700"),
      checkDate: new Date("1830-04-06T00:00:00-0700"),
    },
    {
      id: 4,
      name: "Test System 4",
      designation: "Designation 4",
      installDate: new Date("1820-04-01T00:00:00-0700"),
      checkDate: new Date("1830-04-06T00:00:00-0700"),
    },
    {
      id: 5,
      name: "Test System 5",
      designation: "Designation 5",
      installDate: new Date("1820-04-01T00:00:00-0700"),
      checkDate: new Date("1830-04-06T00:00:00-0700"),
    },
    {
      id: 6,
      name: "Test System 6",
      designation: "Designation 6",
      installDate: new Date("1820-04-01T00:00:00-0700"),
      checkDate: new Date("1830-04-06T00:00:00-0700"),
    },
    {
      id: 7,
      name: "Test System 7",
      designation: "Designation 1",
      installDate: new Date("1820-04-20T00:00:00-0700"),
      checkDate: new Date("1830-04-06T00:00:00-0700"),
    },
  ];

  constructor() { }

  getSystems(roomId: string): System[] {
    return this.testSystems;
  }

  getSystemByID(s: number): System {
    for(var i = 0; i < this.testSystems.length; i++) {
      if(s === this.testSystems[i].id) return this.testSystems[i];
    }
    return this.testSystems[0];
  }

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
      if (this.testDevices[i].name == deviceid) {
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

  getRoomConfig(): SystemUIConfig {
    return {
      id: "Test",
      controlPanels: new Map(),
      controlGroups: new Map([
        ["Layout 1",{
          displays: new Map(),
          inputs: [],
          microphones: new Map(),
          masterVolume: {
            device: "Test",
            block: ""
          }
        }],
        ["Layout 2",{
          displays: new Map(),
          inputs: [],
          microphones: new Map(),
          masterVolume: {
            device: "Test",
            block: ""
          }
        }],
        ["Layout 3",{
          displays: new Map(),
          inputs: [],
          microphones: new Map(),
          masterVolume: {
            device: "Test",
            block: ""
          }
        }]
      ])
    }
  }
}
