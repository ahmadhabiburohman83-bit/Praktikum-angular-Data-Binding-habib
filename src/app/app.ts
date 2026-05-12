import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// Tambahkan import ini agar kenal dengan Todo App:
import { TodoAppComponent } from './components/todo-app/todo-app.component';

@Component({
  selector: 'app-root',
  // Masukkan TodoAppComponent ke dalam imports:
  imports: [RouterOutlet, TodoAppComponent], 
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('setup-angular-habib');
}