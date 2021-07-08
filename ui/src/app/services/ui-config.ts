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
    controlPanels: UIControlPanel[];
    displays: UIDisplay[];
    inputs: UIInput[];
    microphoneGroups: UIMicrophoneGroup[];
    masterVolumeDeviceID: number;
    masterVolumeDeviceBlock: string;

    constructor() {
        this.id = 0;
        this.name = "";
        this.controlPanels = [];
        this.displays = [];
        this.inputs = [];
        this.microphoneGroups = [];
        this.masterVolumeDeviceID = 0;
        this.masterVolumeDeviceBlock = '';
    }
}

export class UIControlPanel {
    deviceID: number;
    controlGroupID: number;
    UIType: string;

    constructor() {
        this.deviceID = 0;
        this.controlGroupID = 0; 
        this.UIType ='';
    }
}
  
export class UIDisplay {
    deviceID: number;
    controlGroupID: number;
    defaultInput: string;
    sortID: number;

    constructor() {
        this.deviceID = 0;
        this.controlGroupID = 0;
        this.defaultInput = '';
        this.sortID = 0;
    }
}

export class UIInput {
    deviceID: number;
    controlGroupID: number;
    sortID: number;

    constructor() {
        this.deviceID = 0;
        this.controlGroupID = 0;
        this.sortID = 0;
    }
}

export class UIMicrophoneGroup {
    id: number;
    name: string;
    controlGroupID: number;
    microphones: UIMicrophone[];

    constructor() {
        this.id = 0;
        this.name = '';
        this.controlGroupID = 0;
        this.microphones = [];
    }
}

export class UIMicrophone {
    deviceID: number;
    microphoneGroupID: number;

    constructor() {
        this.deviceID = 0;
        this.microphoneGroupID = 0;
    }
}