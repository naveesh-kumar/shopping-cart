import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-size',
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.scss'],
})
export class SizeComponent {
  @Input() initialSizeValue!:string;
  @Output() sizeEvent=new EventEmitter;
  @Input() index!:number;

  constructor() {
  }

  updateProduct(size: string) {
    this.sizeEvent.emit(size);
  }
}
