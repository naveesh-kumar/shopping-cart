import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-quantity',
  templateUrl: './quantity.component.html',
  styleUrls: ['./quantity.component.scss'],
})
export class QuantityComponent {
  @Output() qtyEvent = new EventEmitter();
  @Input() initialQtyValue!:number;

  constructor() {}

  updateQty(qty: string) {
    this.qtyEvent.emit(+qty);
  }
}
