export class Port {
    id: string;
    name: string;
    endpoints: Endpoint[];
    direction: string;
    type: string;

    constructor() {
        this.id = '';
        this.name = '';
        this.endpoints = [];
        this.direction = 'bi-directional';
        this.type = '';
    }
}
  
export class Endpoint {
    device: string;
    port: string;

    constructor() {
        this.device = '';
        this.port = '';
    }
}