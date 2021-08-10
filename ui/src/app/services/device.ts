import { Port } from "./port";

export class Device {

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
    hasPresets: boolean;
    presets: Map<string, string>;
    ports: Port[];
    systemIDs: number[];
    tags: Map<string, string>;
    dynamicPorts: boolean;

    constructor() {
        this.id = 0;
        this.name = "";
        this.roomID = 0;
        this.modelID = 0;
        this.installDate = new Date();
        this.warrantyDate = new Date();
        this.location = "";
        this.serialNumber = "";
        this.icon = "";
        this.fundingType = "";
        this.proxyBaseURL = "";
        this.notes = "";
        this.address = "";
        this.hasPresets = false;
        this.presets = new Map();
        this.ports = [];
        this.systemIDs = [];
        this.tags = new Map();
        this.dynamicPorts = false;
    }
}