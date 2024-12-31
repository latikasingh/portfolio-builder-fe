import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Icons, IService, IServiceDto } from '../modals/service.modal';

@Injectable({ providedIn: 'root' })
export class ServiceService {
  constructor(private http: HttpClient) {}

  getServiceData() {
    return this.http.get<IServiceDto>('/user-service');
  }

  getIconsData(iconName: string) {
    let params = new HttpParams();
    params = params.append('name', iconName);
    return this.http.get<{ icons: Icons[] }>('/icons/search', { params });
  }

  addService(payload: IService) {
    return this.http.post<IServiceDto>('/user-service', payload);
  }

  updateService(payload: IService, id: string) {
    return this.http.patch<IServiceDto>(`/user-service/${id}`, payload);
  }

  deleteService(id: string) {
    return this.http.delete(`/user-service/${id}`);
  }
}
