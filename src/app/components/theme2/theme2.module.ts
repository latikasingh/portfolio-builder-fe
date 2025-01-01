import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountUpDirective } from '../../directives/count.directive';
import { SpinnerComponent } from '../spinner/spinner.component';
import { IconsComponent } from '../../common/icons/icons.component';
import { RouterModule } from '@angular/router';
import { SanitizeSvgPipe } from '../../pipes/sanitize.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { HeroComponent } from './hero/hero.component';
import { AboutComponent } from './about/about.component';
import { ResumeComponent } from './resume/resume.component';
import { ResumeCardComponent } from './resume/resume-card/resume-card.component';
import { SkillsComponent } from './skills/skills.component';
import { ProjectsComponent } from './projects/projects.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ServicesComponent } from './services/services.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    HeaderComponent,
    HeroComponent,
    AboutComponent,
    ResumeComponent,
    ResumeCardComponent,
    SkillsComponent,
    ProjectsComponent,
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
    SlickCarouselModule,
  ],
  exports: [
    HeaderComponent,
    HeroComponent,
    AboutComponent,
    ResumeComponent,
    ResumeCardComponent,
    SkillsComponent,
    ProjectsComponent,
    ServicesComponent,
    ContactComponent,
    FooterComponent,
  ],
})
export class Theme2Module {}
