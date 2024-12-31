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
interface DataPoint {
  subtitle: string;
  description: string;
  points: string[];
  startYear: string;
  endYear: string;
}

export interface IProtfolioResume {
  data: DataPoint[];
  title: string;
}
