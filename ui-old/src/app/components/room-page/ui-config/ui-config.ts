export class RoomConfig {
    id: string;
    controlPanels: Map<string, string>;
    controlGroups: Map<string, UIControlGroup>;

    constructor() {
        this.id = '';
        this.controlPanels = new Map();
        this.controlGroups = new Map();
    }
}
  
export class UIControlGroup {
    displays: Map<string, UIDisplay>;
    inputs: string[];
    microphones: Map<string, string[]>;
    masterVolume: MasterVolume;

    constructor() {
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