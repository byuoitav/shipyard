export class Room {
    id: number;
    name: string;
    designation: string;
    publicDescription: string;
    privateDescription: string;
    proxyBaseURL: string;
    tags: Map<string, string>;

    constructor() {
        this.id = 0;
        this.name = "";
        this.designation = "";
        this.privateDescription = "";
        this.publicDescription = "";
        this.proxyBaseURL = "";
        this.tags = new Map();
    }
}