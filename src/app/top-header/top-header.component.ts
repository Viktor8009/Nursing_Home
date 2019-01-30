import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-top-header',
  templateUrl: './top-header.component.html',
  styleUrls: ['./top-header.component.css']
})
export class TopHeaderComponent implements OnInit {

  appTitle: string ="";

  constructor(private configService: ConfigService) {}

  ngOnInit() 
  {   
    this.appTitle = this.configService.get('appTitle');
  }

}
