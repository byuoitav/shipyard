export class Room {
    id: String;
    designation: String;
    publicDescription: String;
    privateDescription: String;
    proxyBaseURL: String;
    tags: Map<String, String>;

    constructor(rm: Room) {
        this.tags = new Map();
        if (rm != null) {
        this.id = rm.id;
        this.publicDescription = rm.publicDescription;
        rm.tags.forEach((value, key) => {
            this.tags.set(key, value);
        });
        } else {
        this.id = "";
        this.publicDescription = "";
        }
    }
}