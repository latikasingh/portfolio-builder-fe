export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  coverImage: string;
  profileImage: string;
  socialMedia: ISocialMedia[];
  tags: string[];
}

export interface ISocialMedia {
  name: string;
  link: string;
  icon?: string;
}
