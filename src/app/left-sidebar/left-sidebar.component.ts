import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { UrlService } from '../url.service';

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.css']
})
export class LeftSidebarComponent implements OnInit {

  private currentLink :string = "/";
  @Output('change') pageChange : EventEmitter<string> = new EventEmitter();

  constructor(private urlService: UrlService) { }

  ngOnInit() 
  {
    this.urlService.urlChanged.subscribe(

      (event) => {

        this.currentLink = event.url;
      }
    );
  }

  onMenuClick($event:Event)
  {
    $event.preventDefault();

    let element = $event.target as HTMLLinkElement;
    
    this.currentLink = element.href.replace(location.origin,"");

    //this.pageChange.emit(this.currentLink);

    this.urlService.jumpTo(this.currentLink);

    console.log(this.currentLink);

  }
}
