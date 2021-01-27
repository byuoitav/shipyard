export class Port {
    id: String;
    name: String;
    endpoint: Endpoint[];
    incoming: boolean;
    type: String;
}
  
export class Endpoint {
    device: String;
    port: String;
}