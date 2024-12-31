import { AboutUserEffects } from './about/about.effects';
import { AuthEffects } from './auth/auth.effects';
import { PortfolioEffects } from './portfolio/portfolio.effects';
import { ResumeEffects } from './resume/resume.effects';
import { SkillsEffects } from './skills/skills.effects';
import { WebsiteUserEffects } from './website/user/user.effects';

export const appEffects = [
  AuthEffects,
  WebsiteUserEffects,
  AboutUserEffects,
  SkillsEffects,
  ResumeEffects,
  PortfolioEffects,
];
