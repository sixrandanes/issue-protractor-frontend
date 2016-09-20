import { RadioValueAccessorDirective } from './radio-value-accessor.directive';

describe('RadioValueAccessorDirective', () => {

  let directive: RadioValueAccessorDirective;

  beforeEach(() => {
    let element = {nativeElement: {checked: true}};
    directive = new RadioValueAccessorDirective(null, element);
  });

  it('should call onChange()', () => {
    spyOn(directive, 'onChange').and.returnValue('OK');
    directive.ngOnChanges({target: {focused: true, name: 'Test'}});
    expect(directive.onChange).toHaveBeenCalledWith('Test');
  });

  it('should not call onChange()', () => {
    spyOn(directive, 'onChange').and.returnValue('OK');
    directive.ngOnChanges({target: {focused: false, name: 'Test'}});
    expect(directive.onChange).not.toHaveBeenCalled();
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
