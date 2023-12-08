import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {playAudio, stopAllAudio} from "../../utils/sound";

@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  styleUrls: ['./credits.component.css']
})
export class CreditsComponent implements OnInit {

  jsonData: any = {};
  currentMessage: number = 0;

  constructor(private router: Router, private http: HttpClient, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    playAudio("/assets/sounds/cheminee.mp3", true);
    this.http.get('/assets/scenes/credits/credits.json').subscribe(data => {
      this.jsonData = data;
    });
  }

  cross(): void {
    if ( this.currentMessage == this.jsonData.length-1 )
    {
      this.jsonData = {};
      stopAllAudio();
      this.router.navigate(["menu"]);
    }
    if ( this.currentMessage < this.jsonData.length-1)
    {
      this.cdr.detectChanges();
      this.currentMessage++;
    }
  }

}
