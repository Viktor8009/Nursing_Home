import { Component, Output, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';
import { environment } from '../environments/environment';
import { EventEmitter } from '@angular/core';
import { User } from './model/User';
import { ConfigService } from './config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  @Output() URLHandler : EventEmitter<string> = new EventEmitter();
  
  public constructor(private titleHandler : Title, private configService: ConfigService){}

  ngOnInit()
  {
    this.titleHandler.setTitle(this.configService.get('appTitle'));
  }
  
  onPageChange(pageUrl:string)
  {
    //console.log('onPageChange:',pageUrl);
    this.URLHandler.emit(pageUrl);
  }

}
