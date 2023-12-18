import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TPaginationComponent } from './t-pagination.component';

describe('TPaginationComponent', () => {
  let component: TPaginationComponent;
  let fixture: ComponentFixture<TPaginationComponent>;
  let firstPageButtonElement: HTMLButtonElement;
  let previousPageButtonElement: HTMLButtonElement;
  let nextPageButtonElement: HTMLButtonElement;
  let lastPageButtonElement: HTMLButtonElement;
  let currentPageElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TPaginationComponent],
    });
    fixture = TestBed.createComponent(TPaginationComponent);
    component = fixture.componentInstance;

    firstPageButtonElement = fixture.nativeElement.querySelector(
      '[data-test-id="pagination-first-page"]'
    );
    previousPageButtonElement = fixture.nativeElement.querySelector(
      '[data-test-id="pagination-previous-page"]'
    );
    nextPageButtonElement = fixture.nativeElement.querySelector(
      '[data-test-id="pagination-next-page"]'
    );
    lastPageButtonElement = fixture.nativeElement.querySelector(
      '[data-test-id="pagination-last-page"]'
    );

    currentPageElement = fixture.nativeElement.querySelector(
      '[data-test-id="current-page"]'
    );
  });

  it('should disable the first & previous buttons when on first page', () => {
    component.currentPage = 0;
    component.totalPages = 10;
    fixture.detectChanges();

    expect(firstPageButtonElement.disabled).toBeTrue();
    expect(previousPageButtonElement.disabled).toBeTrue();

    expect(nextPageButtonElement.disabled).toBeFalse();
    expect(lastPageButtonElement.disabled).toBeFalse();
  });

  it('should enable all buttons when on a page in the middle', () => {
    component.currentPage = 5;
    component.totalPages = 10;
    fixture.detectChanges();

    expect(firstPageButtonElement.disabled).toBeFalse();
    expect(previousPageButtonElement.disabled).toBeFalse();
    expect(nextPageButtonElement.disabled).toBeFalse();
    expect(lastPageButtonElement.disabled).toBeFalse();
  });

  it('should disable the next & last buttons when on last page', () => {
    component.currentPage = 9;
    component.totalPages = 10;
    fixture.detectChanges();

    expect(firstPageButtonElement.disabled).toBeFalse();
    expect(previousPageButtonElement.disabled).toBeFalse();
    expect(nextPageButtonElement.disabled).toBeTrue();
    expect(lastPageButtonElement.disabled).toBeTrue();
  });

  it('should display the 0 indexed current page correctly', () => {
    component.currentPage = 5;
    component.totalPages = 10;
    fixture.detectChanges();

    expect(currentPageElement.innerText).toEqual('Page 6 of 10');
  });

  it('should emit a pagination change event when clicking the first button', () => {
    const paginationChangeSpy = spyOn(component.paginationChange, 'emit');
    component.currentPage = 5;
    component.totalPages = 10;

    firstPageButtonElement.click();
    expect(paginationChangeSpy).toHaveBeenCalledWith(0);
  });

  it('should emit a pagination change event when clicking the previous button', () => {
    const paginationChangeSpy = spyOn(component.paginationChange, 'emit');
    component.currentPage = 5;
    component.totalPages = 10;

    previousPageButtonElement.click();
    expect(paginationChangeSpy).toHaveBeenCalledWith(4);
  });

  it('should emit a pagination change event when clicking the next button', () => {
    const paginationChangeSpy = spyOn(component.paginationChange, 'emit');
    component.currentPage = 5;
    component.totalPages = 10;

    nextPageButtonElement.click();
    expect(paginationChangeSpy).toHaveBeenCalledWith(6);
  });

  it('should emit a pagination change event when clicking the last button', () => {
    const paginationChangeSpy = spyOn(component.paginationChange, 'emit');
    component.currentPage = 5;
    component.totalPages = 10;

    lastPageButtonElement.click();
    expect(paginationChangeSpy).toHaveBeenCalledWith(9);
  });
});
