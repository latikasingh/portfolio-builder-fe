import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPortfolio, IPortfolioDto } from '../modals/portfolio.modal';
import { jsonToFormData } from '../utls';

@Injectable({ providedIn: 'root' })
export class PortfolioService {
  constructor(private http: HttpClient) {}

  addPortfolio(payload: IPortfolio) {
    const formData = jsonToFormData(payload);
    return this.http.post<IPortfolioDto>('/user-project', formData);
  }

  getPortfolio() {
    return this.http.get<IPortfolioDto[]>('/user-project');
  }
}
