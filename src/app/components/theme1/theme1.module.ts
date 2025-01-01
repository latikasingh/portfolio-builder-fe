import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { HeroComponent } from './hero/hero.component';
import { AboutComponent } from './about/about.component';
import { SkillsComponent } from './skills/skills.component';
import { ResumeComponent } from './resume/resume.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ServicesComponent } from './services/services.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './footer/footer.component';
import { CountUpDirective } from '../../directives/count.directive';
import { SpinnerComponent } from '../spinner/spinner.component';
import { IconsComponent } from '../../common/icons/icons.component';
import { RouterModule } from '@angular/router';
import { SanitizeSvgPipe } from '../../pipes/sanitize.pipe';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HeaderComponent,
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ResumeComponent,
    PortfolioComponent,
    ServicesComponent,
    ContactComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    CountUpDirective,
    SpinnerComponent,
    IconsComponent,
    RouterModule,
    SanitizeSvgPipe,
    ReactiveFormsModule,
  ],
  exports: [
    HeaderComponent,
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ResumeComponent,
    PortfolioComponent,
    ServicesComponent,
    ContactComponent,
    FooterComponent,
    SpinnerComponent,
  ],
})
export class Theme1Module {}
