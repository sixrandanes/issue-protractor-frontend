/**
 * Created by benoit.kessler on 24/06/16.
 */
import { Directive, ElementRef, forwardRef , HostListener, OnChanges, Renderer } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const CUSTOM_VALUE_ACCESSOR = {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => RadioValueAccessorDirective), multi: true};

@Directive({
  selector: 'paper-radio-button',
  providers: [CUSTOM_VALUE_ACCESSOR]
})
export class RadioValueAccessorDirective implements ControlValueAccessor, OnChanges {

  onTouched = () => {};
  onChange = (_: any) => {};

  renderer: Renderer;

  constructor(renderer: Renderer, private elementRef: ElementRef) {
    this.renderer = renderer;
  }

  @HostListener('iron-change', ['$event'])
  ngOnChanges(event) {
    // Deux appels sont faits : 1) Gain de focus avec focused à true,
    // 2) perte de focus sur l'ancienne valeur, avec focused à false.
    // Seule la nouvelle valeur nous intéresse
    if (event.target.focused === true) {
      this.onChange(event.target.name);
    }
  }

  writeValue(value: any): void {
    this.renderer.setElementProperty(this.elementRef.nativeElement, 'checked', value === this.elementRef.nativeElement.value);
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
}
