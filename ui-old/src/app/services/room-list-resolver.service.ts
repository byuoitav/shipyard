import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ApiProxyService } from './api-proxy.service';

@Injectable({
  providedIn: 'root'
})
export class RoomListResolver implements Resolve<any> {

  constructor(private proxy: ApiProxyService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.proxy.getRoomList();
  }
}
