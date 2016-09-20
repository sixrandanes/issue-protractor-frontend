import { IldaComboboxValueAccessorDirective } from './ilda-combo-box-value-accessor.directive';

describe('IldaComboboxValueAccessor', () => {

  let directive: IldaComboboxValueAccessorDirective;

  beforeEach(() => {
    let element = {nativeElement: {value: 'default'}};
    directive = new IldaComboboxValueAccessorDirective(element);
  });

  it('should test fireSelectedItemChanged', () => {
    spyOn(directive, 'onChange').and.returnValue('OK');
    spyOn(directive.selectedItemChanged, 'emit');
    directive.fireSelectedItemChanged({detail: {value: 'Element'}});
    expect(directive.onChange).toHaveBeenCalledWith({detail: {value: 'Element'}});
    expect(directive.selectedItemChanged.emit).toHaveBeenCalled();
  });

  it('should test fireValueChanged', () => {
    spyOn(directive, 'onChange').and.returnValue('OK');
    spyOn(directive.valueChanged, 'emit');
    directive.fireValueChanged({detail: {value: 'Element'}});
    expect(directive.onChange).toHaveBeenCalledWith({detail: {value: 'Element'}});
    expect(directive.valueChanged.emit).toHaveBeenCalled();
  });

  it('should test fireCustomValueSet', () => {
    spyOn(directive, 'onChange').and.returnValue('OK');
    spyOn(directive.customValueSet, 'emit');
    directive.fireCustomValueSet('Element');
    expect(directive.onChange).toHaveBeenCalledWith('Element');
    expect(directive.customValueSet.emit).toHaveBeenCalled();
  });

  it('should write new value', () => {
    spyOn(directive, 'onChange').and.returnValue('OK');
    directive.writeValue('Element');
    expect(directive.onChange).toHaveBeenCalledWith('Element');
    expect(directive.elem.nativeElement.value).not.toBeNull();
  });

  it('should reset value', () => {
    spyOn(directive, 'onChange').and.returnValue('OK');
    directive.writeValue(null);
    expect(directive.onChange).toHaveBeenCalledWith(null);
    expect(directive.elem.nativeElement.value).toBeNull();
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
