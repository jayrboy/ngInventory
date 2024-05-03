import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  imports: [RouterModule, MatIconModule],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
