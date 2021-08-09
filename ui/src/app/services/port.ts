export class Port {
    id: number;
    name: string;
    endpoints: Endpoint[];
    direction: string;
    type: string;

    constructor() {
        this.id = 0;
        this.name = '';
        this.endpoints = [];
        this.direction = 'Bi-directional';
        this.type = '';
    }
}
  
export class Endpoint {
    deviceID: number;
    portName: string;
    connectedDeviceID: number;
    connectedPortName: string;

    constructor() {
        this.deviceID = 0;
        this.portName = '';
        this.connectedDeviceID = 0;
        this.connectedPortName = '';
    }
}