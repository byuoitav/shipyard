export class RoomConfig {
    ID: String;
    ControlPanels: Map<String, String>;
    ControlGroups: Map<String, UIControlGroup>;
}
  
export class UIControlGroup {
    Displays: Map<String, UIDisplay>;
    Inputs: String[];
    Microphones: Map<String, String[]>;
    MasterVolume: MasterVolume;
}
  
export class MasterVolume {
    Device: String;
    Block: String;
}
  
export class UIDisplay {
    DefaultInput: String;
}