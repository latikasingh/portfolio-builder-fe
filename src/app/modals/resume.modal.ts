export interface IResume {
  title: string;
  subtitle: string;
  description: string;
  points: string[];
  startYear?: string;
  endYear?: string;
}

export interface IResumeDto extends IResume {
  user: string;
  id: string;
}
