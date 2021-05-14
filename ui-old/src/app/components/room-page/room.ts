export class Room {
    id: string;
    designation: string;
    publicDescription: string;
    privateDescription: string;
    proxyBaseURL: string;
    tags: Map<string, string>;

    constructor() {
        this.tags = new Map();
        this.id = "";
        this.designation = "";
        this.privateDescription = "";
        this.publicDescription = "";
        this.proxyBaseURL = "";
    }
}