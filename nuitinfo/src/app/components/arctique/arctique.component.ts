import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {playAudio, stopAllAudio} from "../../utils/sound";

@Component({
  selector: 'app-arctique',
  templateUrl: './arctique.component.html',
  styleUrls: ['./arctique.component.css']
})
export class ArctiqueComponent implements OnInit {
  jsonData: any = {};
  currentMessage: number = 0;

  constructor(private router: Router, private http: HttpClient, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    playAudio("/assets/sounds/arctic.mp3", true);
    this.http.get('/assets/scenes/premiere-scene-pere-noel/arctique.json').subscribe(data => {
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
      stopAllAudio();
        this.router.navigate(['carte'], { queryParams: { numero: 1 } }); 
    }
    if ( this.currentMessage < this.jsonData.length-1)
    {
      this.cdr.detectChanges();
      this.currentMessage++;
    }
  }

}
