import { Component, Input } from '@angular/core';
import { TData } from '../types';

@Component({
  selector: 't-column',
  standalone: true,
  template: '',
})
export class TColumnComponent<T extends TData> {
  @Input({ required: true }) name!: string;
  @Input({ required: true }) property!: keyof T;
  @Input() sortable: boolean = false;
}
