import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';  
import { AuthService } from '../../service/auth.service'; 

@Component({
  selector: 'app-favorite',
  standalone: true,
  imports: [RouterOutlet], 
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.css',
})
export class FavoriteComponent {
  constructor(private authService: AuthService) {

  }
}

