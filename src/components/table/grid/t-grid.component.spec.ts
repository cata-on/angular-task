import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';

import { TGridComponent } from './t-grid.component';

import { Component } from '@angular/core';
import { TColumnComponent } from '../column/t-column.component';

const MOCK_DATA = [
  { id: 1, name: 'test1', price: 100 },
  { id: 2, name: 'test2', price: 200 },
  { id: 3, name: 'test3', price: 30 },
  { id: 4, name: 'test4', price: 400 },
  { id: 5, name: 'test5', price: 50 },
  { id: 6, name: 'test6', price: 600 },
  { id: 7, name: 'test7', price: 70 },
];

type MockDataType = typeof MOCK_DATA;

const createTestHostComponent = (
  data: MockDataType | Observable<MockDataType>,
  pageSize: number,
  sortable: boolean
) => {
  @Component({
    standalone: true,
    imports: [TGridComponent, TColumnComponent],
    template: `
      <t-grid
        [data]="data"
        [pageSize]="pageSize"
        [sortable]="sortable"
        (paginationChange)="handlePaginationChangeSpy($event)"
        (sortChange)="handleSortChangeSpy($event)"
      >
        <t-column [name]="'ID'" [property]="'id'" [sortable]="true"></t-column>
        <t-column [name]="'Name'" [property]="'name'"></t-column>
        <t-column
          [name]="'Price'"
          [property]="'price'"
          [sortable]="true"
        ></t-column>
      </t-grid>
    `,
  })
  class TestHostComponent {
    data = data;
    pageSize = pageSize;
    sortable = sortable;

    handlePaginationChangeSpy = jasmine.createSpy('handlePaginationChangeSpy');
    handleSortChangeSpy = jasmine.createSpy('handleSortChangeSpy');
  }

  return TestHostComponent;
};

const rowDataToDomStringExpectation = (rowData: MockDataType[number]) =>
  Object.values(rowData).join('\n');

describe('TGridComponent', () => {
  let paginationButtons: Record<string, HTMLButtonElement>;
  let paginationElement: HTMLElement;
  let headerButtons: HTMLButtonElement[];

  const mountTestComponent = (
    data: MockDataType | Observable<MockDataType>,
    pageSize: number,
    sortable: boolean
  ) => {
    const HostComponent = createTestHostComponent(data, pageSize, sortable);
    TestBed.configureTestingModule({ imports: [HostComponent] });
    const fixture = TestBed.createComponent(HostComponent);
    const component = fixture.componentInstance;

    fixture.detectChanges();

    paginationButtons = {
      first: fixture.nativeElement.querySelector(
        '[data-test-id="pagination-first-page"]'
      ),
      prev: fixture.nativeElement.querySelector(
        '[data-test-id="pagination-previous-page"]'
      ),
      next: fixture.nativeElement.querySelector(
        '[data-test-id="pagination-next-page"]'
      ),
      last: fixture.nativeElement.querySelector(
        '[data-test-id="pagination-last-page"]'
      ),
    };

    paginationElement = fixture.nativeElement.querySelector(
      '[data-test-id="pagination"]'
    );

    headerButtons = fixture.nativeElement.querySelectorAll(
      '[data-test-id="header-cell-button"]'
    );

    return {
      fixture,
      component,
      getRowElements: (): HTMLElement[] =>
        fixture.nativeElement.querySelectorAll('[data-test-id="row"]'),
    };
  };

  it('should display data correctly when passing an array', () => {
    const { fixture } = mountTestComponent(MOCK_DATA, 2, true);

    const rows = fixture.nativeElement.querySelectorAll('[data-test-id="row"]');
    expect(rows.length).toBe(2);
  });

  it('should display data correctly when passing an observable', () => {
    const { fixture } = mountTestComponent(of(MOCK_DATA), 2, true);

    const rows = fixture.nativeElement.querySelectorAll('[data-test-id="row"]');
    expect(rows.length).toBe(2);
  });

  it('should navigate correctly between pages', () => {
    const { component, fixture, getRowElements } = mountTestComponent(
      MOCK_DATA,
      2,
      true
    );

    expect(paginationElement.innerText).toContain('Page 1 of 4');
    getRowElements().forEach((row, index) =>
      expect(row.innerText).toContain(
        rowDataToDomStringExpectation(MOCK_DATA[index])
      )
    );

    paginationButtons['next'].click();
    fixture.detectChanges();

    expect(paginationElement.innerText).toContain('Page 2 of 4');
    expect(component.handlePaginationChangeSpy).toHaveBeenCalledTimes(1);
    expect(component.handlePaginationChangeSpy).toHaveBeenCalledWith({
      currentPage: 1,
      pageSize: 2,
    });
    getRowElements().forEach((row, index) =>
      expect(row.innerText).toContain(
        rowDataToDomStringExpectation(MOCK_DATA[index + 2])
      )
    );

    paginationButtons['last'].click();
    fixture.detectChanges();

    expect(paginationElement.innerText).toContain('Page 4 of 4');
    expect(component.handlePaginationChangeSpy).toHaveBeenCalledTimes(2);
    expect(component.handlePaginationChangeSpy).toHaveBeenCalledWith({
      currentPage: 3,
      pageSize: 2,
    });
    getRowElements().forEach((row, index) =>
      expect(row.innerText).toContain(
        rowDataToDomStringExpectation(MOCK_DATA[index + 6])
      )
    );

    paginationButtons['prev'].click();
    fixture.detectChanges();

    expect(paginationElement.innerText).toContain('Page 3 of 4');
    expect(component.handlePaginationChangeSpy).toHaveBeenCalledTimes(3);
    expect(component.handlePaginationChangeSpy).toHaveBeenCalledWith({
      currentPage: 2,
      pageSize: 2,
    });
    getRowElements().forEach((row, index) =>
      expect(row.innerText).toContain(
        rowDataToDomStringExpectation(MOCK_DATA[index + 4])
      )
    );

    paginationButtons['first'].click();
    fixture.detectChanges();

    expect(paginationElement.innerText).toContain('Page 1 of 4');
    expect(component.handlePaginationChangeSpy).toHaveBeenCalledTimes(4);
    expect(component.handlePaginationChangeSpy).toHaveBeenCalledWith({
      currentPage: 0,
      pageSize: 2,
    });
    getRowElements().forEach((row, index) =>
      expect(row.innerText).toContain(
        rowDataToDomStringExpectation(MOCK_DATA[index])
      )
    );
  });

  it('should sort data correctly when clicking the sortable headers', () => {
    const { component, fixture, getRowElements } = mountTestComponent(
      MOCK_DATA,
      2,
      true
    );

    expect(paginationElement.innerText).toContain('Page 1 of 4');
    getRowElements().forEach((row, index) =>
      expect(row.innerText).toContain(
        rowDataToDomStringExpectation(MOCK_DATA[index])
      )
    );

    // Sort by Price ASC
    headerButtons[2].click();
    fixture.detectChanges();

    expect(component.handleSortChangeSpy).toHaveBeenCalledTimes(1);
    expect(component.handleSortChangeSpy).toHaveBeenCalledWith({
      columnName: 'price',
      direction: 'ascending',
    });
    let rows = getRowElements();
    expect(rows[0].innerText).toContain(
      rowDataToDomStringExpectation(MOCK_DATA[2])
    );

    expect(rows[1].innerText).toContain(
      rowDataToDomStringExpectation(MOCK_DATA[4])
    );

    // Sort by Price DESC
    headerButtons[2].click();
    fixture.detectChanges();
    expect(component.handleSortChangeSpy).toHaveBeenCalledTimes(2);
    expect(component.handleSortChangeSpy).toHaveBeenCalledWith({
      columnName: 'price',
      direction: 'descending',
    });

    rows = getRowElements();
    expect(rows[0].innerText).toContain(
      rowDataToDomStringExpectation(MOCK_DATA[5])
    );

    expect(rows[1].innerText).toContain(
      rowDataToDomStringExpectation(MOCK_DATA[3])
    );

    // Sort by ID ASC
    headerButtons[0].click();
    fixture.detectChanges();

    expect(component.handleSortChangeSpy).toHaveBeenCalledTimes(3);
    expect(component.handleSortChangeSpy).toHaveBeenCalledWith({
      columnName: 'id',
      direction: 'ascending',
    });
    rows = getRowElements();
    expect(rows[0].innerText).toContain(
      rowDataToDomStringExpectation(MOCK_DATA[0])
    );

    expect(rows[1].innerText).toContain(
      rowDataToDomStringExpectation(MOCK_DATA[1])
    );

    // Sort by ID DESC
    headerButtons[0].click();
    fixture.detectChanges();

    expect(component.handleSortChangeSpy).toHaveBeenCalledTimes(4);
    expect(component.handleSortChangeSpy).toHaveBeenCalledWith({
      columnName: 'id',
      direction: 'descending',
    });
    rows = getRowElements();
    expect(rows[0].innerText).toContain(
      rowDataToDomStringExpectation(MOCK_DATA[6])
    );

    expect(rows[1].innerText).toContain(
      rowDataToDomStringExpectation(MOCK_DATA[5])
    );
  });
});
