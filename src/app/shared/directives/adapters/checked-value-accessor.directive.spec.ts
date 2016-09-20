import { CheckedValueAccessorDirective } from './checked-value-accessor.directive';

describe('CheckedValueAccessorDirective', () => {

  let directive: CheckedValueAccessorDirective;

  beforeEach(() => {
    let element = {nativeElement: {checked: true}};
    directive = new CheckedValueAccessorDirective(element);
  });

  it('should call onChange()', () => {
    spyOn(directive, 'onChange').and.returnValue('OK');
    directive.ngOnChanges(null);
    expect(directive.onChange).toHaveBeenCalledWith(true);
  });

  it('should write new value', () => {
    expect(directive.el.checked).toBeTruthy();
    directive.writeValue(false);
    expect(directive.el.checked).toBeFalsy();
  });

  it('should register onChange method', () => {
    let onChange = () => 'changed';

    expect(directive.onChange).not.toEqual(onChange);
    directive.registerOnChange(onChange);
    expect(directive.onChange).toEqual(onChange);
  });

  it('should register onTouched method', () => {
    let onTouched = () => 'touched';

    expect(directive.onTouched).not.toEqual(onTouched);
    directive.registerOnTouched(onTouched);
    expect(directive.onTouched).toEqual(onTouched);
  });
});
