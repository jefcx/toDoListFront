import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appTextAreaValue]'
})
export class TextAreaValueDirective {
  @Input('appTextAreaValue') deleteValue: boolean;

  constructor(private element: ElementRef) { }

  public changeTextArea() {
    if(this.deleteValue) {
      console.log('Value textArea::'+this.element.nativeElement.value);
      this.element.nativeElement.value = '';
    }
  }
}
