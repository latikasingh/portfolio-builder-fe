import { Component, Input, OnInit } from '@angular/core';
import { menuOptions } from '../../constants';
import { Store } from '@ngrx/store';
import { logout } from '../../store/auth/auth.action';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-menue',
  templateUrl: './menue.component.html',
  styleUrl: './menue.component.scss',
})
export class MenueComponent implements OnInit {
  @Input() activeTab: string = '';
  menuOptions: { option: string; icon: string }[] = menuOptions;

  constructor(
    private store: Store,
    private router: Router,
  ) {}

  ngOnInit(): void {}

  navigateScreen(tabName: string) {
    this.router.navigate([`settings/${tabName}`]);
  }

  onLogout() {
    this.store.dispatch(logout());
  }
}
