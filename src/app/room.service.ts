import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Http, Response } from '@angular/http';
import { ConfigService } from './config.service';
import { Room } from './model/Room';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService extends HttpService{
private baseURL:string;
public roomSubject: Subject<any> = new Subject();
public rooms : Array<Room> = [];
  constructor( http:Http, configService: ConfigService) { 

    super(http,configService);
    this.baseURL = this.configService.get("usersApi");
    this.getAllRooms();
  }

  getAllRooms()
  {
    this.read(`${this.baseURL}/room/all`)
    .then(
      (response:Response) => {
        this.rooms = response.json();
        this.roomSubject.next(this.rooms);
      });
  }

  pushRoom(room:Room)
  {
    return this.create(`${this.baseURL}/room`,room);
  }
  editRoom(room:Room)
  {
    return this.update(`${this.baseURL}/room/${room.id}`,room);
  }
  deleteRoom(room:Room)
  {
    return this.delete(`${this.baseURL}/room/${room.id}`);
  }
}
