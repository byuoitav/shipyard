import { Injectable } from '@angular/core';
import { Device } from './device';
import { Room } from './room';
import { System } from './system';
import { UIControlGroup } from './ui-config';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  testRoomList: any[] = [
    {
      name: "ASB-TEST",
      id: 1
    },
    {
      name: "BYUB-TEST",
      id: 2
    }, 
    {
      name: "EB-TEST",
      id: 3
    },
    {
      name: "HBLL-TEST",
      id: 4
    },
    {
      name: "ITB-TEST",
      id: 5
    },
    {
      name: "ITB-TEST2",
      id: 6
    },
    {
      name: "ITB-TEST3",
      id: 7
    },
    {
      name: "JFSB-TEST",
      id: 8
    },
    {
      name: "KMBL-TEST",
      id: 9
    },
    {
      name: "MARB-TEST",
      id: 10
    },
    {
      name: "TMCB-TEST",
      id: 11
    }
  ];

  testRooms: Room[] = [
    {
      id: 1,
      name: "ASB-TEST",
      designation: "designation ASB-TEST",
      publicDescription: "this is ASB-TEST",
      privateDescription: "notes on ASB-TEST",
      proxyBaseURL: "huh...",
      tags: new Map()
    },
    {
      id: 2,
      name: "BYUB-TEST",
      designation: "designation BYUB-TEST",
      publicDescription: "this is BYUB-TEST",
      privateDescription: "notes on BYUB-TEST",
      proxyBaseURL: "huh...",
      tags: new Map()
    },
    {
      id: 3,
      name: "EB-TEST",
      designation: "designation EB-TEST",
      publicDescription: "this is EB-TEST",
      privateDescription: "notes on EB-TEST",
      proxyBaseURL: "huh...",
      tags: new Map()
    },
    {
      id: 4,
      name: "HBLL-TEST",
      designation: "designation HBLL-TEST",
      publicDescription: "this is HBLL-TEST",
      privateDescription: "notes on HBLL-TEST",
      proxyBaseURL: "huh...",
      tags: new Map()
    },
    {
      id: 5,
      name: "ITB-TEST",
      designation: "designation ITB-TEST",
      publicDescription: "this is ITB-TEST",
      privateDescription: "notes on ITB-TEST",
      proxyBaseURL: "huh...",
      tags: new Map()
    },
    {
      id: 6,
      name: "ITB-TEST2",
      designation: "designation ITB-TEST2",
      publicDescription: "this is ITB-TEST2",
      privateDescription: "notes on ITB-TEST2",
      proxyBaseURL: "huh...",
      tags: new Map()
    },
    {
      id: 7,
      name: "ITB-TEST3",
      designation: "designation ITB-TEST3",
      publicDescription: "this is ITB-TEST3",
      privateDescription: "notes on ITB-TEST3",
      proxyBaseURL: "huh...",
      tags: new Map()
    },
    {
      id: 8,
      name: "JFSB-TEST",
      designation: "designation JFSB-TEST",
      publicDescription: "this is JFSB-TEST",
      privateDescription: "notes on JFSB-TEST",
      proxyBaseURL: "huh...",
      tags: new Map()
    },
    {
      id: 9,
      name: "KMBL-TEST",
      designation: "designation KMBL-TEST",
      publicDescription: "this is KMBL-TEST",
      privateDescription: "notes on KMBL-TEST",
      proxyBaseURL: "huh...",
      tags: new Map()
    },
    {
      id: 10,
      name: "MARB-TEST",
      designation: "designation MARB-TEST",
      publicDescription: "this is MARB-TEST",
      privateDescription: "notes on MARB-TEST",
      proxyBaseURL: "huh...",
      tags: new Map()
    },
    {
      id: 11,
      name: "TMCB-TEST",
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
      roomID: 7,
      modelID: 1,
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
          id: 1,
          name: 'Port1',
          endpoints: [],
          direction: 'Input',
          type: ''
        },
        {
          id: 2,
          name: 'Port2',
          endpoints: [],
          direction: 'Input',
          type: ''
        },
        {
          id: 3,
          name: 'Port3',
          endpoints: [
            {
              deviceID: 1,
              portName: 'Port3',
              connectedDeviceID: 2,
              connectedPortName: 'Port6'
            }
          ],
          direction: 'Input',
          type: ''
        },
        {
          id: 4,
          name: 'Port4',
          endpoints: [],
          direction: 'Input',
          type: ''
        },
        {
          id: 5,
          name: 'Port5',
          endpoints: [],
          direction: 'Input',
          type: ''
        },
        {
          id: 6,
          name: 'Port6',
          endpoints: [],
          direction: 'Output',
          type: ''
        },
        {
          id: 7,
          name: 'Port7',
          endpoints: [],
          direction: 'Output',
          type: ''
        },
        {
          id: 8,
          name: 'Port8',
          endpoints: [],
          direction: 'Output',
          type: ''
        },
        {
          id: 9,
          name: 'Port9',
          endpoints: [],
          direction: 'Output',
          type: ''
        }
      ],
      systemIDs: [1, 2, 3, 4, 5, 6, 7],
      tags: new Map(),
      dynamicPorts: true
    },
    {
      id: 2,
      name: "Device 2",
      roomID: 10,
      modelID: 2,
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
          id: 91,
          name: 'Port1',
          endpoints: [],
          direction: 'Input',
          type: ''
        },
        {
          id: 92,
          name: 'Port2',
          endpoints: [],
          direction: 'Input',
          type: ''
        },
        {
          id: 93,
          name: 'Port3',
          endpoints: [],
          direction: 'Input',
          type: ''
        },
        {
          id: 94,
          name: 'Port4',
          endpoints: [],
          direction: 'Input',
          type: ''
        },
        {
          id: 95,
          name: 'Port5',
          endpoints: [],
          direction: 'Input',
          type: ''
        },
        {
          id: 96,
          name: 'Port6',
          endpoints: [
            {
              deviceID: 2,
              portName: 'Port6',
              connectedDeviceID: 1,
              connectedPortName: 'Port3'
            }
          ],
          direction: 'Output',
          type: ''
        },
        {
          id: 97,
          name: 'Port7',
          endpoints: [],
          direction: 'Output',
          type: ''
        },
        {
          id: 98,
          name: 'Port8',
          endpoints: [],
          direction: 'Output',
          type: ''
        },
        {
          id: 99,
          name: 'Port9',
          endpoints: [],
          direction: 'Output',
          type: ''
        }
      ],
      systemIDs: [4, 5, 6],
      tags: new Map(),
      dynamicPorts: false
    },
    {
      id: 3,
      name: "TEST-0000-MIC1",
      roomID: 3,
      modelID: 3,
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
      tags: new Map(),
      dynamicPorts: false
    },
    {
      id: 4,
      name: "TEST-0000-MIC2",
      roomID: 4,
      modelID: 4,
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
      tags: new Map(),
      dynamicPorts: false
    },
    {
      id: 5,
      name: "TEST-0000-MIC3",
      roomID: 9,
      modelID: 5,
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
      tags: new Map(),
      dynamicPorts: false
    },
    {
      id: 6,
      name: "TEST-0000-CP1",
      roomID: 6,
      modelID: 6,
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
      tags: new Map(),
      dynamicPorts: false
    },
    {
      id: 7,
      name: "TEST-0000-CP2",
      roomID: 8,
      modelID: 7,
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
      tags: new Map(),
      dynamicPorts: false
    },
    {
      id: 8,
      name: "TEST-0000-CP3",
      roomID: 1,
      modelID: 8,
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
      tags: new Map(),
      dynamicPorts: false
    },
    {
      id: 9,
      name: "TEST-0000-D1",
      roomID: 2,
      modelID: 5,
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
      tags: new Map(),
      dynamicPorts: false
    },
    {
      id: 10,
      name: "TEST-0000-D2",
      roomID: 11,
      modelID: 3,
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
      tags: new Map(),
      dynamicPorts: false
    },
    {
      id: 11,
      name: "TEST-0000-D3",
      roomID: 5,
      modelID: 7,
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
      tags: new Map(),
      dynamicPorts: false
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

  testModelList = [
    {
      id: 1,
      name: "Model 1",
      manufacturer: "Manufacturer 1"
    },
    {
      id: 2,
      name: "Model 2",
      manufacturer: "Manufacturer 2"
    },
    {
      id: 3,
      name: "Model 3",
      manufacturer: "Manufacturer 3"
    },
    {
      id: 4,
      name: "Model 4",
      manufacturer: "Manufacturer 4"
    },
    {
      id: 5,
      name: "Model 5",
      manufacturer: "Manufacturer 5"
    },
    {
      id: 6,
      name: "Model 6",
      manufacturer: "Manufacturer 6"
    },
    {
      id: 7,
      name: "Model 7",
      manufacturer: "Manufacturer 7"
    },
    {
      id: 8,
      name: "Model 8",
      manufacturer: "Manufacturer 8"
    }
  ];

  testControlGroups: UIControlGroup[] = [
    {
      id: 1,
      name: 'Default',
      controlPanels: [],
      displays: [],
      inputs: [],
      microphoneGroups: [],
      masterVolumeDeviceID: 2,
      masterVolumeDeviceBlock: ''
    }
  ];

  constructor() { }

  getSystems(roomId: number): System[] {
    return this.testSystems;
  }

  getSystemByID(s: number): System {
    for (var i = 0; i < this.testSystems.length; i++) {
      if (s === this.testSystems[i].id) return this.testSystems[i];
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

  getRoomByID(id: number): Room {
    for (let i = 0; i < this.testRooms.length; i++) {
      if (this.testRooms[i].id == id) {
        return this.testRooms[i];
      }
    }
    return this.testRooms[0];
  }

  getRoom(roomid: number): Room {
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

  getDevices(roomid: number): Device[] {
    return this.testDevices;
  }

  getDeviceByID(id: number): Device {
    for (var i = 0; i < this.testDevices.length; i++) {
      if (id === this.testDevices[i].id) {
        return this.testDevices[i];
      }
    }
    return this.testDevices[0];
  }

  getModelByID(id: number) {
    for (var i = 0; i < this.testModelList.length; i++) {
      if (id === this.testModelList[i].id) {
        return this.testModelList[i];
      }
    }
    return this.testModelList[0];
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

  getControlGroups(systemID: number): UIControlGroup[] {
    return this.testControlGroups;
  }
}
