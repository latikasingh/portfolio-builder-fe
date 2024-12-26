import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAuthUserLoading } from '../store/auth/auth.selector';
import { CommonModule } from '@angular/common';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { MainModule } from '../components/main.module';
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [MainModule, CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  animations: [fadeInOnEnterAnimation()],
})
export class MainComponent implements OnInit {
  userLoading$: Observable<boolean>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.userLoading$ = this.store.select(selectAuthUserLoading);
  }

  scrollToSection(sectionId: string): void {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
