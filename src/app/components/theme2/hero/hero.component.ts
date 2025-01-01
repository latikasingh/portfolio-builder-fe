import { Component, OnInit } from '@angular/core';
import { Observable, take } from 'rxjs';
import { IUser } from '../../../modals/user.modal';
import { Store } from '@ngrx/store';
import { selectWebsiteUser } from '../../../store/website/user/user.selector';
import Typed from 'typed.js';

@Component({
  selector: 'app-theme2-hero',
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent implements OnInit {
  user$: Observable<IUser>;
  texts: string[] = ['Designer', 'Developer'];

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.user$ = this.store.select(selectWebsiteUser);

    this.user$.pipe(take(2)).subscribe((user) => {
      this.texts = user.tags;
      this.createTypingEffect();
    });
  }

  createTypingEffect() {
    const options = {
      strings: this.texts,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 1000,
      startDelay: 500,
      loop: true,
      showCursor: true,
      cursorChar: '|',
    };

    const typed = new Typed('.typed', options);
  }
}
