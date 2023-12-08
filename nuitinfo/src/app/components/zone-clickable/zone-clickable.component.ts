import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-zone-clickable',
  templateUrl: './zone-clickable.component.html',
  styleUrls: ['./zone-clickable.component.css']
})
export class ZoneClickableComponent {
  @Output() divClicked = new EventEmitter<string>();
  @Input() idZone: string="";
  @Input() taille: { width: number, height: number } = { width: 100, height: 100 };  
  @Input() position: { top: number, left: number } = { top: 0, left: 0 };
  
  onClick(): void {
    this.divClicked.emit(this.idZone);
  }
}
