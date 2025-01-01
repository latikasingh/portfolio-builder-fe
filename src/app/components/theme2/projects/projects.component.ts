import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IPortfolio } from '../../../modals/portfolio.modal';
import { selectWebsitePortfolioData } from '../../../store/website/user/user.selector';

@Component({
  selector: 'app-theme2-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent implements OnInit {
  projectData$: Observable<IPortfolio[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.projectData$ = this.store.select(selectWebsitePortfolioData);

    this.projectData$.subscribe((data) => {
      console.log(data);
    });
  }
}
