export class SystemUIConfig {
    id: string;
    controlPanels: Map<string, string>;
    controlGroups: UIControlGroup[];

    constructor() {
        this.id = '';
        this.controlPanels = new Map();
        this.controlGroups = [];
    }
}
  
export class UIControlGroup {
    id: number;
    name: string;
    displays: Map<string, UIDisplay>;
    inputs: string[];
    microphones: Map<string, string[]>;
    masterVolume: MasterVolume;

    constructor() {
        this.id = 0;
        this.name = "";
        this.displays = new Map();
        this.inputs = [];
        this.microphones = new Map();
        this.masterVolume = new MasterVolume();
    }
}
  
export class MasterVolume {
    device: string;
    block: string;

    constructor() {
        this.device = '';
        this.block = '';
    }
}
  
export class UIDisplay {
    defaultInput: string;

    constructor() {
        this.defaultInput = '';
    }
}