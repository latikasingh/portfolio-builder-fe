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
import { SpinnerComponent } from '../components/spinner/spinner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextareaComponent } from '../formcomponents/textarea/textarea.component';
import { DatepickerComponent } from '../formcomponents/datepicker/datepicker.component';
import { RadioComponent } from '../formcomponents/radio/radio.component';
import { ModalComponent } from '../formcomponents/modal/modal.component';
import { SelectComponent } from '../formcomponents/select/select.component';
import { DragDropDirective } from '../directives/drag-drop.directive';

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
    SpinnerComponent,
    ReactiveFormsModule,
    FormsModule,
    TextareaComponent,
    DatepickerComponent,
    RadioComponent,
    ModalComponent,
    SelectComponent,
    DragDropDirective,
  ],
  exports: [RouterModule],
})
export class SettingsModule {}
