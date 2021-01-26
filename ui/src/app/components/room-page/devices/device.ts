import { Port } from "../ports/port";

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