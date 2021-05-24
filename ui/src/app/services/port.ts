export class Port {
    id: string;
    name: string;
    endpoints: Endpoint[];
    incoming: boolean;
    type: string;

    constructor() {
        this.id = '';
        this.name = '';
        this.endpoints = [];
        this.incoming = true;
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