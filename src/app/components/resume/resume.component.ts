import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IProtfolioResume, IResume } from '../../modals/resume.modal';
import { selectWebsiteResumeData } from '../../store/website/user/user.selector';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.scss',
})
export class ResumeComponent {
  resumeData$: Observable<IProtfolioResume[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.resumeData$ = this.store.select(selectWebsiteResumeData);
  }
}
