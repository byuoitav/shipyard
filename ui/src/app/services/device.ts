import { Port } from "./port";

export class Device {
    id: string;
    // roomId: string;
    name: string;
    // api_controllable: boolean;
    publicDescription: string;
    // privateDescription: string;
    address: string;
    driver: string;
    dynamicPorts: boolean;
    ports: Port[];
    tags: Map<string, string>;
  
    Type: string;

    constructor() {
        this.tags = new Map();
        this.id = "";
        this.name = "";
        this.publicDescription = "";
        this.address = "";
        this.driver = "";
        this.dynamicPorts = true;
        this.ports = [];
        this.Type = "";
    }
}