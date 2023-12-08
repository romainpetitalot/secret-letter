import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {playAudio, stopAllAudio} from "../../utils/sound";

@Component({
  selector: 'app-premiere-scene-pere-noel',
  templateUrl: './premiere-scene-pere-noel.component.html',
  styleUrls: ['./premiere-scene-pere-noel.component.css']
})
export class PremiereScenePereNoelComponent implements OnInit {
  jsonData: any = {};
  currentMessage: number = 0;

  constructor(private router: Router, private http: HttpClient, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    playAudio("/assets/sounds/cheminee.mp3", true);
    this.http.get('/assets/scenes/premiere-scene-pere-noel/chalet.json').subscribe(data => {
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
      this.router.navigate(["arctique"]);
    }
    if ( this.currentMessage < this.jsonData.length-1)
    {
      this.cdr.detectChanges();
      this.currentMessage++;
    }
  }

}
