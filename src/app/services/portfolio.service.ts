import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPortfolio, IPortfolioDto } from '../modals/portfolio.modal';
import { jsonToFormData } from '../utls';

@Injectable({ providedIn: 'root' })
export class PortfolioService {
  constructor(private http: HttpClient) {}

  addPortfolio(payload: IPortfolio, images: any) {
    const formData = jsonToFormData(payload);

    (images ?? []).forEach((file: any) => {
      formData.append('projectImages', file);
    });
    return this.http.post<IPortfolioDto>('/user-project', formData);
  }

  updatePortfolio(payload: IPortfolio, images: any, id: string) {
    const formData = jsonToFormData(payload);

    (images ?? []).forEach((file: any) => {
      formData.append('projectImages', file);
    });
    return this.http.patch<IPortfolioDto>(`/user-project/${id}`, formData);
  }

  deletePortfolio(id: string) {
    return this.http.delete(`/user-project/${id}`);
  }

  getPortfolio() {
    return this.http.get<IPortfolioDto[]>('/user-project');
  }
}
