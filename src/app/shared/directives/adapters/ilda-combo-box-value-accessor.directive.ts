/**
 * Created by benoit.kessler on 24/06/16.
 */
import { Directive, ElementRef, forwardRef, HostListener, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const CUSTOM_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => IldaComboboxValueAccessorDirective), multi: true
};

@Directive({
  selector: 'ilda-combo-box',
  providers: [CUSTOM_VALUE_ACCESSOR]
})
export class IldaComboboxValueAccessorDirective implements ControlValueAccessor {

  @Output() selectedItemChanged = new EventEmitter();
  @Output() valueChanged = new EventEmitter();
  @Output() customValueSet = new EventEmitter();

  onTouched = () => {
  };
  onChange = (_: any) => {
  };

  elem: any;

  constructor(elementRef: ElementRef) {
    this.elem = elementRef;
  }

  @HostListener('selected-item-changed', ['$event.detail.value'])
  fireSelectedItemChanged(event) {
    this.onChange(event);
    this.selectedItemChanged.emit(event);
  }

  @HostListener('value-changed', ['$event.detail.value'])
  fireValueChanged(event) {
    this.onChange(event);
    this.valueChanged.emit(event);
  }

  @HostListener('custom-value-set', ['$event'])
  fireCustomValueSet(event) {
    this.onChange(event);
    this.customValueSet.emit(event);
  }

  writeValue(value: any): void {
    this.onChange(value);

    // En cas de reset, forcer la valeur à null pour mettre à jour l'affichage
    if (!value) {
      this.elem.nativeElement.value = null;
    }
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
