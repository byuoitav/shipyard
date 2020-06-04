import { Injectable } from '@angular/core';

export class Building {
  ID: String;
  Tags: Map<String, String>;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  getBuildings(): Building[] {
    return [
      {
        ID: "ITB",
        Tags: new Map()
      },
      {
        ID: "HCEB",
        Tags: new Map()
      },
      {
        ID: "ASB",
        Tags: new Map()
      },
      {
        ID: "BYUB",
        Tags: new Map()
      },
      {
        ID: "EB",
        Tags: new Map()
      }
    ]
  }
}
