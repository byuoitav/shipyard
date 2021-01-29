export class RoomConfig {
    id: String;
    controlPanels: Map<String, String>;
    controlGroups: Map<String, UIControlGroup>;
}
  
export class UIControlGroup {
    displays: Map<String, UIDisplay>;
    inputs: String[];
    microphones: Map<String, String[]>;
    masterVolume: MasterVolume;
}
  
export class MasterVolume {
    device: String;
    block: String;
}
  
export class UIDisplay {
    defaultInput: String;
}