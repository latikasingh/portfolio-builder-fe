import { Component, ElementRef, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ISkill } from '../../../modals/skills.modal';
import { selectWebsiteSkillData } from '../../../store/website/user/user.selector';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-theme2-skills',
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
  animations: [
    trigger('progressAnimation', [
      state(
        'initial',
        style({
          width: '0%',
        }),
      ),
      state(
        'final',
        style({
          width: '{{ percentage }}%',
        }),
        { params: { percentage: 0 } }, // Default percentage
      ),
      transition('initial => final', animate('1s ease-in-out')),
    ]),
  ],
})
export class SkillsComponent implements OnInit {
  skills$: Observable<ISkill>;
  progressState = 'initial';

  constructor(
    private store: Store,
    private elementRef: ElementRef,
  ) {}

  ngOnInit(): void {
    this.skills$ = this.store.select(selectWebsiteSkillData);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.progressState = 'final';
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
      },
    );

    observer.observe(this.elementRef.nativeElement);
  }
}
