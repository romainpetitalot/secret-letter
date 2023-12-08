import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-carte',
  templateUrl: './carte.component.html',
  styleUrls: ['./carte.component.css']
})
export class CarteComponent implements OnInit {
  jsonData: any = {};
  currentMessage: number = 0;
  step: number = 0;
  zoneClick: string[] = ["arctique","usa", "bresil", "chine", "oceanie"  ];
  mapOpened: any;
  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.step = +params['numero']; 
      this.http.get('/assets/carte/carte'+this.step+'.json').subscribe(data => {
        this.jsonData = data;
      });
    });
    
    


  }



  handleDivClick(idZone: string): void {
      const maMap = document.getElementById("map-" +idZone);
      // Vérifiez si l'élément existe avant de tenter de le modifier
      if (maMap && this.step > this.zoneClick.indexOf(idZone)) {
        maMap.classList.remove("hidden");
        maMap.classList.add("block");
        this.mapOpened = maMap;
        // this.isDisplayed = true;
        this.zoneClick.forEach((zone) => {
          let maZoneCLick = document.getElementById(zone);
          if (maZoneCLick) {
            maZoneCLick.classList.remove("block");
            maZoneCLick.classList.add("hidden");
  
          }
        });
      } 
      if( this.step == this.zoneClick.indexOf(idZone)) {
        console.log(this.jsonData[this.currentMessage].type=="click");
        if (this.jsonData[this.currentMessage].type=="click" && idZone == this.jsonData[this.currentMessage].div_id) {
          this.cross();
        }
      }
  }

  cross(): void {
    if ( this.currentMessage == this.jsonData.length-1 )
    {
      this.jsonData = {};
      switch(this.step) {
        case 1: 
            this.router.navigate(["usa"]);
            break; 
        case 2: 
          this.router.navigate(["bresil"]);
            break; 
        case 3: 
          this.router.navigate(["chine"]);
            break; 
        case 4: 
          this.router.navigate(["oceanie"]);
            break; 
        case 5: 
          this.router.navigate(["menu"]);
            break; 
      } 
    } else {
      this.cdr.detectChanges();
      this.currentMessage++;
    }
  }

  closeIframe() {

    // Vérifiez si l'élément existe avant de tenter de le modifier
    if (this.mapOpened) {
      this.mapOpened.classList.remove("block");
      this.mapOpened.classList.add("hidden");
      // this.isDisplayed = false;
      this.zoneClick.forEach((zone) => {
        let maZoneCLick = document.getElementById(zone);
        if (maZoneCLick) {
          maZoneCLick.classList.remove("hidden");
          maZoneCLick.classList.add("block");
    
        }
      });
      this.mapOpened = null;

    }
  }


}

