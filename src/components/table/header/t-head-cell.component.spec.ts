import { ComponentFixture, TestBed } from '@angular/core/testing';
import { THeadCellComponent } from './t-head-cell.component';
import { Direction } from '../types';

describe('THeadCellComponent', () => {
  let component: THeadCellComponent;
  let fixture: ComponentFixture<THeadCellComponent>;
  let cellButtonElement: HTMLButtonElement;

  const getSortDirectionElement = () =>
    fixture.nativeElement.querySelector(
      '[data-test-id="header-cell-sort-direction"]'
    );

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [THeadCellComponent],
    });
    fixture = TestBed.createComponent(THeadCellComponent);
    component = fixture.componentInstance;

    cellButtonElement = fixture.nativeElement.querySelector(
      '[data-test-id="header-cell-button"]'
    );
  });

  it('should render the button enabled', () => {
    fixture.detectChanges();
    expect(cellButtonElement.disabled).toBeFalse();
  });

  it('should render the button disabled', () => {
    component.disabled = true;
    fixture.detectChanges();
    expect(cellButtonElement.disabled).toBeTrue();
  });

  it('should not display the sort element when no sorting active', () => {
    component.sortDirection = null;
    fixture.detectChanges();
    expect(getSortDirectionElement().getAttribute('data-direction')).toBeNull();
  });

  it('should display the correct sorting when ASC', () => {
    component.sortDirection = Direction.ASC;
    fixture.detectChanges();

    expect(getSortDirectionElement().getAttribute('data-direction')).toBe(
      Direction.ASC
    );
  });

  it('should display the correct sorting when DESC', () => {
    component.sortDirection = Direction.DESC;
    fixture.detectChanges();
    expect(getSortDirectionElement().getAttribute('data-direction')).toBe(
      Direction.DESC
    );
  });

  it('should emit the correct sort event when clicked & no sorting active', () => {
    const sortChangeSpy = spyOn(component.sortChange, 'emit');
    component.sortDirection = null;
    fixture.detectChanges();

    cellButtonElement.click();
    expect(sortChangeSpy).toHaveBeenCalledWith({ direction: Direction.ASC });
  });

  it('should emit the correct sort event when clicked & current sorting ASC', () => {
    const sortChangeSpy = spyOn(component.sortChange, 'emit');
    component.sortDirection = Direction.ASC;
    fixture.detectChanges();

    cellButtonElement.click();
    expect(sortChangeSpy).toHaveBeenCalledWith({ direction: Direction.DESC });
  });

  it('should emit the correct sort event when clicked & current sorting DESC', () => {
    const sortChangeSpy = spyOn(component.sortChange, 'emit');
    component.sortDirection = Direction.DESC;
    fixture.detectChanges();

    cellButtonElement.click();
    expect(sortChangeSpy).toHaveBeenCalledWith({ direction: Direction.ASC });
  });
});
