import { AuthEffects } from './auth/auth.effects';
import { WebsiteUserEffects } from './website/user/user.effects';

export const appEffects = [AuthEffects, WebsiteUserEffects];