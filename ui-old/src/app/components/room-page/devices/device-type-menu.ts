export class DeviceTypeNode {
    label: string;
    icon: string;
    value: string;
    subNodes: DeviceTypeNode[];

    constructor() {
        this.label = "";
        this.icon = "";
        this.value = "";
        this.subNodes = [];
    }
}