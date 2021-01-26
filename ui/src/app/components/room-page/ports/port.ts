export class Port {
    ID: String;
    Name: String;
    Endpoints: Endpoint[];
    Incoming: boolean;
    Type: String;
}
  
export class Endpoint {
    Device: String;
    Port: String;
}