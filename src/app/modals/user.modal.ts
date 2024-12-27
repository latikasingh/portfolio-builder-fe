export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  coverImage: any;
  profileImage: any;
  socialMedia: ISocialMedia[];
  tags: string[];
}

export interface ISocialMedia {
  name: string;
  link: string;
  icon?: string;
}
