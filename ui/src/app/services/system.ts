export class System {
    id: string;
    name: string;
    designation: string;
    installDate: Date;
    checkDate: Date;

    constructor() {
        this.id = "";
        this.name = "";
        this.designation = "";
        this.installDate = new Date();
        this.checkDate = new Date();
    }
}