export interface IAbout {
  designation: string;
  description: string;
  designationDescription: string;
  DOB: string;
  age: string;
  website: string;
  degree: string;
  phone: number;
  city: string;
  freelancer: boolean;

  happyClient: number;
  projects: number;
  hoursOfSupports: number;
  team: number;
}

export interface IAboutDto extends IAbout {
  user: string;
  id: string;
}
