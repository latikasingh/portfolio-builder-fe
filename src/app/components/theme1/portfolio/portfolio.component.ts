import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { IPortfolio } from '../../../modals/portfolio.modal';
import { selectWebsitePortfolioData } from '../../../store/website/user/user.selector';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
})
export class PortfolioComponent {
  list: IPortfolio[] = [];
  filterList: IPortfolio[] = [];
  types: string[] = [];
  filterType: string = '';
  portfolioData$: Observable<IPortfolio[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.portfolioData$ = this.store.select(selectWebsitePortfolioData);
    this.portfolioData$.subscribe((data) => {
      this.list = data || [];
      this.filterList = data || [];
      this.updateTypes();
    });
  }

  private updateTypes(): void {
    this.types = [...new Set(this.list.map((item) => item.type))];
  }

  filter(type?: string) {
    if (type) {
      this.filterType = type;
      this.filterList = this.list?.filter((item) => item.type === type);
    } else {
      this.filterType = '';
      this.filterList = this.list;
    }
  }
}
