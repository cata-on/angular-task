import { Pipe, PipeTransform } from '@angular/core';
import { Direction, TData } from '../types';

@Pipe({ standalone: true, name: 'order_by' })
export class OrderPipe<T extends TData> implements PipeTransform {
  transform(data: T[], columnName?: keyof T, direction?: Direction): T[] {
    if (!columnName || !direction) return data;
    const dataCopy = [...data];

    dataCopy.sort((a, b) => {
      const aValue = a[columnName];
      const bValue = b[columnName];
      if (aValue > bValue) return direction === Direction.ASC ? 1 : -1;
      if (aValue < bValue) return direction === Direction.ASC ? -1 : 1;
      return 0;
    });

    return dataCopy;
  }
}
