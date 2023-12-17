import { Component, Input } from '@angular/core';

@Component({
  selector: 't-column',
  standalone: true,
  template: '',
})
export class TColumnComponent<TData extends Record<string, unknown>> {
  @Input({ required: true }) name: string = '';
  @Input({ required: true }) property: keyof TData = '';
}
