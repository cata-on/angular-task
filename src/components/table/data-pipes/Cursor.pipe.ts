import { Pipe, PipeTransform } from '@angular/core';
import { TData } from '../types';

@Pipe({ standalone: true, name: 'cursor' })
export class CursorPipe<T extends TData> implements PipeTransform {
  transform(data: T[], currentPage: number, pageSize: number | null): T[] {
    if (!pageSize) return data;
    const indexStart = currentPage * pageSize;
    const indexEnd = (currentPage + 1) * pageSize;
    return data.slice(indexStart, indexEnd);
  }
}
