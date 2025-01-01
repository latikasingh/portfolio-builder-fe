import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ISkill } from '../../../modals/skills.modal';
import { selectWebsiteSkillData } from '../../../store/website/user/user.selector';

@Component({
  selector: 'app-theme2-skills',
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
})
export class SkillsComponent implements OnInit {
  skills$: Observable<ISkill>;
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.skills$ = this.store.select(selectWebsiteSkillData);
  }
}
