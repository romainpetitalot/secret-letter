import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {playAudio, stopAllAudio} from "../../utils/sound";

@Component({
  selector: 'app-bresil',
  templateUrl: './bresil.component.html',
  styleUrls: ['./bresil.component.css']
})
export class BresilComponent implements OnInit {
  jsonData: any = {};
  currentMessage: number = 0;

  constructor(private router: Router, private http: HttpClient, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    playAudio("/assets/sounds/bresil.mp3",true);
    this.http.get('/assets/scenes/bresil/bresil.json').subscribe(data => {
      this.jsonData = data;
    });
  }

  handleDivClick(idZone: string): void {
    if (this.jsonData[this.currentMessage].type=="click" && idZone == this.jsonData[this.currentMessage].div_id) {
      this.cross();
    }
  }

  cross(): void {
    console.log(this.currentMessage);
    if ( this.currentMessage == this.jsonData.length-1 )
    {
      this.jsonData = {};
        console.log("end");
        stopAllAudio();
        this.router.navigate(['carte'], { queryParams: { numero: 3 } }); 
    
    }
    if ( this.currentMessage < this.jsonData.length-1)
    {
      this.cdr.detectChanges();
      this.currentMessage++;
    }
  }

}
