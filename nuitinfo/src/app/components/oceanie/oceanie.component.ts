import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {playAudio, stopAllAudio} from "../../utils/sound";

@Component({
  selector: 'app-oceanie',
  templateUrl: './oceanie.component.html',
  styleUrls: ['./oceanie.component.css']
})
export class OceanieComponent implements OnInit {
  jsonData: any = {};
  currentMessage: number = 0;

  constructor(private router: Router, private http: HttpClient, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    playAudio("/assets/sounds/oceanie.mp3",true)
    this.http.get('/assets/scenes/oceanie/oceanie.json').subscribe(data => {
      this.jsonData = data;
    });
  }

  handleDivClick(idZone: string): void {
    if (this.jsonData[this.currentMessage].type=="click" && idZone == this.jsonData[this.currentMessage].div_id) {
      this.cross();
    }
  }

  cross(): void {
    if ( this.currentMessage == this.jsonData.length-1 )
    {
      this.jsonData = {};
      stopAllAudio();
      this.router.navigate(['carte'], { queryParams: { numero: 5 } }); 
    }
    if ( this.currentMessage < this.jsonData.length-1)
    {
      this.cdr.detectChanges();
      this.currentMessage++;
    }
  }

}
