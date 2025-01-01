import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IProtfolioResume, IResumeDto } from '../../../modals/resume.modal';
import { Store } from '@ngrx/store';
import { selectWebsiteResumeData } from '../../../store/website/user/user.selector';

@Component({
  selector: 'app-theme2-resume',
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.scss',
})
export class ResumeComponent implements OnInit {
  resumeData$: Observable<IProtfolioResume[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.resumeData$ = this.store.select(selectWebsiteResumeData);
  }
}
