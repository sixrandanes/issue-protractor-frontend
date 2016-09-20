/**
 * Created by benoit.kessler on 24/06/16.
 */
import { Directive, ElementRef, forwardRef , HostListener, OnChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const CUSTOM_VALUE_ACCESSOR = {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => CheckedValueAccessorDirective), multi: true};

@Directive({
  selector: 'paper-checkbox, paper-toggle-button',
  providers: [CUSTOM_VALUE_ACCESSOR]
})
export class CheckedValueAccessorDirective implements ControlValueAccessor, OnChanges {

  onTouched = () => {};
  onChange = (_: any) => {};

  el: any;

  constructor(elRef: ElementRef) {
    this.el = elRef.nativeElement;
  }

  @HostListener('iron-change', ['$event'])
  ngOnChanges(e) {
    this.onChange(this.el.checked);
  }

  writeValue(value: any): void {
    this.el.checked = value;
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
}
