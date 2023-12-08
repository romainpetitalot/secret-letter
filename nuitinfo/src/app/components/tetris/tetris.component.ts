import { Component, ViewChild, ElementRef, OnInit, AfterViewInit, NgModule } from '@angular/core';
import { BoardComponent } from "./board/board.component";


@Component({
  selector: 'app-tetris',
  templateUrl: './tetris.component.html',
  styleUrls: ['./tetris.component.css']
})
export class TetrisComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  initBoard() {
  }

}
