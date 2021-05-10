import { Injectable } from '@angular/core';

/* Types */
export interface campus {
  abbreviation: string;
  name: string;
}

export interface building {
  id: number;
  abbreviation: string;
  name: string;
  campusAbbreviation: string;
}

export interface roomPhoto {
  id: number;
  roomID: number;
  url: string;
  owned: boolean;
}

export interface tag {
  key: string;
  value: string;
}

export interface room {
  id: number;
  buildingID: number;
  roomNumber: string;
  type: string;
  publishedDescription: string;
  systemIDs: number[];
  notes: string;
  photos: roomPhoto[];
  tags: tag[];
}

export interface system {
  id: number;
  name: string;
  designation: string;
  installDate: Date;
  checkDate: Date;
  deviceIDs: number[];
  roomIDs: number[];
}

export interface device {
  id: number;
  name: string;
  roomID: number;
  modelID: number;
  installDate: Date;
  warrantyDate: Date;
  location: string;
  serialNumber: string;
  icon: string;
  fundingType: string;
  proxyBaseURL: string;
  notes: string;
  address: string;
  ports: devicePort[];
  systemIDs: number[];
  tags: tag[];
}

export interface devicePort {
  id: string;
  name: string;
  endpoints: portEndpoint[];
  direction: string;
  type: string;
}

export interface portEndpoint {
  device: string;
  port: string;
}

export interface deviceModel {
  id: number;
  manufacturer: string;
  modelNumber: string;
}

/* MOCK DATA */

const mock_campuses: campus[] = [
  {
    abbreviation: 'BYU',
    name: 'Brigham Young University'
  },
  {
    abbreviation: 'BYUH',
    name: 'Brigham Young University Hawaii'
  }
];

const mock_buildings: building[] = [
  {
    id: 1,
    abbreviation: "ITB",
    name: "Information Technology Building",
    campusAbbreviation: "BYU",
  },
  {
    id: 2,
    abbreviation: "JKB",
    name: "Jesse Knight Building",
    campusAbbreviation: "BYU",
  },
  {
    id: 3,
    abbreviation: "JFSB",
    name: "Joseph F. Smith Building",
    campusAbbreviation: "BYU",
  }
]

const mock_rooms: room[] = [
  {
    id: 1,
    buildingID: 1,
    roomNumber: "1004",
    type: "Conference Room",
    publishedDescription: "",
    systemIDs: [
      1,
      2,
    ],
    notes: "",
    photos: [
      {
        id: 1,
        roomID: 1,
        url: "https://byu.edu",
        owned: true,
      }
    ],
    tags: [
      {
        key: "testing",
        value: "true",
      },
    ],
  },
  {
    id: 2,
    buildingID: 1,
    roomNumber: "1006",
    type: "Conference Room",
    publishedDescription: "",
    systemIDs: [],
    notes: "",
    photos: [
      {
        id: 1,
        roomID: 1,
        url: "https://byu.edu",
        owned: true,
      }
    ],
    tags: [
      {
        key: "testing",
        value: "true",
      },
    ],
  },

  {
    id: 3,
    buildingID: 1,
    roomNumber: "1010",
    type: "Conference Room",
    publishedDescription: "",
    systemIDs: [],
    notes: "",
    photos: [
      {
        id: 1,
        roomID: 1,
        url: "https://byu.edu",
        owned: true,
      }
    ],
    tags: [
      {
        key: "testing",
        value: "true",
      },
    ],
  },

  {
    id: 4,
    buildingID: 1,
    roomNumber: "1108",
    type: "Conference Room",
    publishedDescription: "",
    systemIDs: [],
    notes: "",
    photos: [
      {
        id: 1,
        roomID: 1,
        url: "https://byu.edu",
        owned: true,
      }
    ],
    tags: [
      {
        key: "testing",
        value: "true",
      },
    ],
  },
]

const mock_systems: system[] = [
  {
    id: 1,
    name: "ITB 1004 Primary",
    designation: "production",
    installDate: new Date("2020-01-01"),
    checkDate: new Date("2020-02-01"),
    deviceIDs: [
      1,
      2,
      3,
    ],
    roomIDs: [
      1,
    ],
  },
  {
    id: 2,
    name: "ITB 1004 Backup",
    designation: "production",
    installDate: new Date("2020-01-01"),
    checkDate: new Date("2020-02-01"),
    deviceIDs: [
      1,
      2,
    ],
    roomIDs: [
      1,
    ],
  },
]

const mock_devices: device[] = [
  {
    id: 1,
    name: "ITB-1004-D1",
    roomID: 1,
    modelID: 1,
    installDate: new Date("2020-01-01"),
    warrantyDate: new Date("2020-01-01"),
    location: "Mounted to Ceiling",
    serialNumber: "abc124",
    icon: "tv",
    fundingType: "Departmental",
    proxyBaseURL: "",
    notes: "",
    address: "itb-1004-d1.byu.edu",
    ports: [],
    systemIDs: [
      1,
      2,
    ],
    tags: [],
  },
  {
    id: 2,
    name: "ITB-1004-CP1",
    roomID: 1,
    modelID: 2,
    installDate: new Date("2020-01-01"),
    warrantyDate: new Date("2020-01-01"),
    location: "Mounted to South Wall",
    serialNumber: "pi123",
    icon: "tv",
    fundingType: "Departmental",
    proxyBaseURL: "",
    notes: "",
    address: "itb-1004-cp1.byu.edu",
    ports: [],
    systemIDs: [
      1,
      2,
    ],
    tags: [],
  },
  {
    id: 3,
    name: "ITB-1004-SW1",
    roomID: 1,
    modelID: 3,
    installDate: new Date("2020-01-01"),
    warrantyDate: new Date("2020-01-01"),
    location: "In cupboard nearest the door",
    serialNumber: "abc124",
    icon: "tv",
    fundingType: "Departmental",
    proxyBaseURL: "",
    notes: "",
    address: "itb-1004-sw1.byu.edu",
    ports: [],
    systemIDs: [
      1,
    ],
    tags: [],
  },
]

const mock_models: deviceModel[] = [
  {
    id: 1,
    manufacturer: "Sony",
    modelNumber: "PHZ10",
  },
  {
    id: 2,
    manufacturer: "BYU",
    modelNumber: "ControlPiV4",
  },
  {
    id: 3,
    manufacturer: "Atlona",
    modelNumber: "AT-OME-PS62",
  },
]

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  /* Campuses */

  getCampus(abbr: string): campus | null {
    for (var campus of mock_campuses) {
      if (campus.abbreviation === abbr) {
        return campus;
      }
    }
    return null;
  }

  getAllCampuses(): campus[] {
    return mock_campuses;
  }


  /* Buildings */

  getBuilding(id: number): building | null {
    for (var b of mock_buildings) {
      if (b.id === id) {
        return b;
      }
    }
    return null;
  }

  getCampusBuildings(abbr: string): building[] {
    let buildings: building[] = [];
    for (let b of mock_buildings) {
      if (b.campusAbbreviation === abbr) {
        buildings.push(b);
      }
    }

    return buildings;
  }

  getAllBuildings(): building[] {
    return mock_buildings;
  }

  /* Rooms */

  getAllRooms(): room[] {
    return mock_rooms;
  }

  getRoom(id: number): room | null {
    for (var r of mock_rooms) {
      if (r.id === id) {
        return r;
      }
    }
    return null;
  }

  getBuildingRooms(id: number): room[] {
    let rooms: room[] = [];
    for (var r of mock_rooms) {
      if (r.buildingID === id) {
        rooms.push(r);
      }
    }
    return rooms;
  }

  getSystemRooms(systemID: number): room[] {
    let rooms: room[] = [];
    for (var r of mock_rooms) {
      if (r.systemIDs.indexOf(systemID) > -1) {
        rooms.push(r);
      }
    }
    return rooms;
  }

  /* Systems */

  getAllSystems(): system[] {
    return mock_systems;
  }

  getSystem(id: number): system | null {
    for (var s of mock_systems) {
      if (s.id === id) {
        return s;
      }
    }
    return null;
  }

  getRoomSystems(roomID: number): system[] {
    let systems: system[] = [];
    for (var s of mock_systems) {
      if (s.roomIDs.indexOf(roomID) > -1) {
        systems.push(s);
      }
    }
    return systems;
  }

  getDeviceSystems(deviceID: number): system[] {
    let systems: system[] = [];
    for (var s of mock_systems) {
      if (s.deviceIDs.indexOf(deviceID) > -1) {
        systems.push(s);
      }
    }
    return systems;
  }

  /* Devices */

  getAllDevices(): device[] {
    return mock_devices;
  }

  getDevice(id: number): device | null {
    for (var d of mock_devices) {
      if (d.id === id) {
        return d;
      }
    }
    return null;
  }

  getRoomDevices(roomID: number): device[] {
    let devs: device[] = [];
    for (var d of mock_devices) {
      if (d.roomID === roomID) {
        devs.push(d);
      }
    }
    return devs;
  }

  getSystemDevices(systemID: number): device[] {
    let devs: device[] = [];
    for (var d of mock_devices) {
      if (d.systemIDs.indexOf(systemID) > -1) {
        devs.push(d);
      }
    }
    return devs;
  }

  /* Device Models */

  getAllDeviceModels(): deviceModel[] {
    return mock_models;
  }

}
