import { Component, OnInit, Output, OnDestroy } from '@angular/core';
import { Room } from '../model/Room';
import { RoomService } from '../room.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit, OnDestroy {
  
  @Output()rooms: Array<Room> = [];
  @Output() keys: Array<{key:string,label:string}> = [
    { key:"id",   label:"#"},
    { key:"name", label:"név"},
    { key:"size", label:"méret"},
    { key:"slot", label:"férőhely"},
    { key:"floor", label:"szint"},
    { key:"active", label:"aktív"}
  ];
  @Output() newRoom : Room = new Room(0);
  private subjectSubscribe = null;
  constructor(private roomService: RoomService)
  {
    this.roomService.getAllRooms();
  }
  
  ngOnInit() 
  {
    this.subjectSubscribe = this.roomService.roomSubject
    .subscribe(
      (rooms) =>{
        this.rooms = rooms;
      });
    }
    
    ngOnDestroy(): void {
     this.subjectSubscribe.unsubscribe();
    }
    createRoom()
    {
      this.roomService.pushRoom(this.newRoom)
      .then(
        (response:Response) => 
        {
            console.log(response);
            this.roomService.getAllRooms();
            this.newRoom = new Room();
        });
    }
    edit(room:Room)
    {
      this.roomService.editRoom(room)
      .then(
        (response:Response) => 
        {
            console.log(response);
            this.roomService.getAllRooms();
        });
    }

    delete(room:Room)
    {
      this.roomService.deleteRoom(room)
      .then(
        (response:Response) => 
        {
            console.log(response);
            this.roomService.getAllRooms();
        });
    }
}
