export class Port {
    id: String;
    name: String;
    endpoints: Endpoint[];
    incoming: boolean;
    type: String;
}
  
export class Endpoint {
    device: String;
    port: String;
}