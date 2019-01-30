import { Component, OnInit, Output, OnDestroy } from '@angular/core';
import { Supply } from '../model/Supply';
import { SupplyService } from '../supply.service';

@Component({
  selector: 'app-supply',
  templateUrl: './supply.component.html',
  styleUrls: ['./supply.component.css']
})
export class SupplyComponent implements OnInit,OnDestroy {
  
  @Output() supplies : Array<Supply> = [];
  @Output() newItem: Supply = new Supply(0);
  private subjectSubscribe = null;
  @Output() supplyKeys: Array<{key:string,value:string}>=[
    
    {key:"id", value:"#"},
    {key:"item", value:"Tétel neve"},
    {key:"pieces", value:"Darabszám"},
    {key:"administrator", value:"Ügyeletes"},
    {key:"supplyDate", value: "Beszerzés dátuma"}
  ];
  constructor(private supplyService:SupplyService)
  {
    this.supplyService.getItemsOnStock();
  }
  
  ngOnInit()
  {
    this.subjectSubscribe = this.supplyService.supplySubject
    .subscribe(
      (supplies)=>{

        this.supplies = supplies;
        
      });
    }
    
    ngOnDestroy(): void 
    {
      this.subjectSubscribe.unsubscribe();  
    }

    createNewItem()
    {
      this.supplyService.pushAnItem(this.newItem)
          .then(
             (response:Response)=>{

              this.supplyService.getItemsOnStock();
              this.newItem = new Supply();
             });
    }

    editSupply(supply:Supply)
    {
        this.supplyService.editAnItem(supply)
            .then(
              (response:Response)=>{
                this.supplyService.getItemsOnStock();
          });
    }

    deleteSupply(supply:Supply)
    {
        this.supplyService.deleteAnItem(supply)
            .then(
              (response:Response)=>{
                this.supplyService.getItemsOnStock();
          });
    }
}
