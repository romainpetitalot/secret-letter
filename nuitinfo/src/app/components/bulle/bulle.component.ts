import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { PremiereScenePereNoelComponent } from '../premiere-scene-pere-noel/premiere-scene-pere-noel.component';
import { UnsubscriptionError } from 'rxjs';
import {playAudio, randomBlabla} from "../../utils/sound";

@Component({
  selector: 'app-bulle',
  templateUrl: './bulle.component.html',
  styleUrls: ['./bulle.component.css']
})
export class BulleComponent implements OnInit {
  @Input() messageObject:any = {};
  @Output() divClicked = new EventEmitter<string>();
  @Input() positionAndIndex: { top: number, left: number, index: number, transform: string } = { top: -150, left: -200, index:99, transform:"rotate(0deg)" };
  randomPosAndIndex: any = [{top: -500, left:1000, index:99999, transform:"rotate(5deg)"},{top: -150, left:-350, index:999, transform:"rotate(-20deg)"}]
  selectedAnswers: any = [];

  constructor() { }
  ngOnInit(): void {
    randomBlabla();
    this.positionAndIndex = this.randomPosAndIndex[Math.floor(Math.random() * this.randomPosAndIndex.length)];
  }

  compareArrays = (a: any[], b: any[]): boolean => {
    const sortedArray1 = a.slice().sort();
    const sortedArray2 = b.slice().sort();
  
    return JSON.stringify(sortedArray1) === JSON.stringify(sortedArray2);
  };

  // Call this function after the child component has been initialized
  crossOrAnswer() {
    if(!this.messageObject.reponses) 
    {
      randomBlabla();
      this.positionAndIndex = this.randomPosAndIndex[Math.floor(Math.random() * this.randomPosAndIndex.length)];

      this.divClicked.emit("cross");
      return;
    }

    let allGood: Boolean = true;
    this.messageObject.reponses.forEach((answer:any) => {
      if(  answer.isValid){
        if ( this.selectedAnswers.filter((selection:any) => selection.texte === answer.texte ).length == 0) {
          allGood = false;
        }
      } else {
        if ( this.selectedAnswers.filter((selection:any) => selection.texte === answer.texte ).length > 0) {
          allGood = false;
        }
      }
    });

    if(allGood){
      randomBlabla();
      this.divClicked.emit();
    }
    else{
      playAudio("/assets/sounds/error.mp3",false);
    }
  }

  handleClick(answer: any) {
    // Vérifie si answer est dans la liste selectedAnswers
    const index = this.selectedAnswers.indexOf(answer);

    if (index !== -1) {
        // Si answer est présent, le supprime
        this.selectedAnswers.splice(index, 1);
    } else {
        // Si answer est absent, l'ajoute
        this.selectedAnswers.push(answer);
    }
    console.log(this.selectedAnswers);

  }
  
  isSelected(answer: any) {
    return this.selectedAnswers.filter((selection:any) => selection.texte == answer.texte).length >0;
  }
}
