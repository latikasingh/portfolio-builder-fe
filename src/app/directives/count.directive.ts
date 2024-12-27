import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[countUp]',
})
export class CountUpDirective implements OnChanges {
  @Input('countUp') targetCount: number = 0;
  @Input() duration: number = 2000;

  constructor(
    private readonly elementRef: ElementRef,
    private readonly renderer: Renderer2,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['targetCount'] || changes['duration']) {
      this.startCountUp();
    }
  }

  private startCountUp(): void {
    const stepTime = Math.max(Math.floor(this.duration / this.targetCount), 20);
    let currentCount = 0;

    const intervalId = setInterval(() => {
      currentCount += 1;

      if (currentCount >= this.targetCount) {
        currentCount = this.targetCount;
        clearInterval(intervalId);
      }

      this.renderer.setProperty(
        this.elementRef.nativeElement,
        'innerText',
        currentCount,
      );
    }, stepTime);
  }
}
