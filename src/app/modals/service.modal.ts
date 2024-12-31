export interface IService {
  description: string;
  services: IUserService[];
}

export interface IServiceDto extends IService {
  user: string;
  id: string;
}

export interface Icons {
  icon: string;
  value: string;
}

export interface IUserService {
  title: string;
  icon?: string;
  description: string;
  svg: string;
}
