import { Port } from "../ports/port";

export class Device {
    id: String;
    // api_controllable: boolean;
    publicDescription: String;
    // privateDescription: String;
    address: String;
    driver: String;
    dynamicPorts: boolean;
    ports: Port[];
    tags: Map<String, String>
  
    Type: String;
  
    constructor(dev: Device) {
        this.tags = new Map();
        if (dev != null) {
            this.id = dev.id;
            this.Type = dev.Type;
            this.address = dev.address;
            dev.tags.forEach((value, key) => {
            this.tags.set(key, value);
            });
        } else {
            this.id = "";
            this.Type = "";
            this.address = "";
        }
    }
}