import { Pipe, PipeTransform } from '@angular/core';
import { TData } from '../types';

@Pipe({ standalone: true, name: 'page_count' })
export class PageCountPipe<T extends TData> implements PipeTransform {
  transform(data: T[], pageSize: number | null): number {
    if (pageSize === null) return 1;
    return Math.ceil(data.length / pageSize);
  }
}
