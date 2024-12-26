import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings/settings.component';
import { RouterModule } from '@angular/router';
import { MenueComponent } from './menue/menue.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { IconsComponent } from '../common/icons/icons.component';
import { ProfileComponent } from './profile/profile.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ResumeComponent } from './resume/resume.component';
import { ServiceComponent } from './service/service.component';
import { SkillsComponent } from './skills/skills.component';
import { InputComponent } from '../formcomponents/input/input.component';

@NgModule({
  declarations: [
    SettingsComponent,
    MenueComponent,
    ProfileComponent,
    AboutComponent,
    ContactComponent,
    PortfolioComponent,
    ResumeComponent,
    ServiceComponent,
    SkillsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SettingsRoutingModule,
    IconsComponent,
    InputComponent,
  ],
  exports: [RouterModule],
})
export class SettingsModule {}
