export interface ISkill {
  description: string;
  skills: ISkillsData[];
}

export interface ISkillsData {
  name: string;
  percentage: number;
}
export interface ISkillDto extends ISkill {
  user?: string;
  id: string;
}
