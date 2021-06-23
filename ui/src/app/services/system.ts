export class System {
    id: number;
    name: string;
    designation: string;
    installDate: Date;
    checkDate: Date;

    constructor() {
        this.id = 0;
        this.name = "";
        this.designation = "";
        this.installDate = new Date();
        this.checkDate = new Date();
    }
}