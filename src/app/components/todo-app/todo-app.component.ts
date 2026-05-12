import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';   

interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
}

@Component({
  selector: 'app-todo-app',
  standalone: true, // INI WAJIB ADA
  imports: [CommonModule, FormsModule], // INI JUGA WAJIB ADA
  templateUrl: './todo-app.component.html',
  styleUrls: ['./todo-app.component.css']
})
export class TodoAppComponent {
  // Identitas Mahasiswa
  nama = 'Ahmad Habiburrahman';
  nim = '253107040030';
  kelas = '1C';
  
  // Form inputs (Two-way binding)
  newTodoTitle = '';
  newTodoDescription = '';
  newTodoPriority: 'low' | 'medium' | 'high' = 'medium';

  // Edit mode
  editingId: number | null = null;
  editTitle = '';
  editDescription = '';
  editPriority: 'low' | 'medium' | 'high' = 'medium';

  // Filter
  filterStatus: 'all' | 'active' | 'completed' = 'all';
  searchTerm = '';

  // Todos array
  todos: Todo[] = [
    {
      id: 1,
      title: 'Belajar Angular Data Binding',
      description: 'Pelajari interpolation, property, event, dan two-way binding',
      completed: false,
      priority: 'high',
      createdAt: new Date()
    },
    {
      id: 2,
      title: 'Praktikum Todo App',
      description: 'Buat aplikasi todo dengan semua jenis binding',
      completed: false,
      priority: 'medium',
      createdAt: new Date()
    }
  ];

  nextId = 3;

  // Computed properties (Interpolation)
  get totalTodos(): number {
    return this.todos.length;
  }

  get completedTodos(): number {
    return this.todos.filter(t => t.completed).length;
  }

  get activeTodos(): number {
    return this.todos.filter(t => !t.completed).length;
  }

  get completionPercentage(): number {
    if (this.totalTodos === 0) return 0;
    return Math.round((this.completedTodos / this.totalTodos) * 100);
  }

  get filteredTodos(): Todo[] {
    let filtered = this.todos;

    // Filter by status
    if (this.filterStatus === 'active') {
      filtered = filtered.filter(t => !t.completed);
    } else if (this.filterStatus === 'completed') {
      filtered = filtered.filter(t => t.completed);
    }

    // Search filter
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(t =>
        t.title.toLowerCase().includes(term) ||
        t.description.toLowerCase().includes(term)
      );
    }

    return filtered;
  }

  // Event handlers
  addTodo(): void {
    if (!this.newTodoTitle.trim()) {
      alert('Title is required!');
      return;
    }

    const newTodo: Todo = {
      id: this.nextId++,
      title: this.newTodoTitle,
      description: this.newTodoDescription,
      completed: false,
      priority: this.newTodoPriority,
      createdAt: new Date()
    };

    this.todos.push(newTodo);
    this.resetForm();
  }

  resetForm(): void {
    this.newTodoTitle = '';
    this.newTodoDescription = '';
    this.newTodoPriority = 'medium';
  }

  toggleComplete(id: number): void {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
    }
  }

  deleteTodo(id: number): void {
    if (confirm('Delete this todo?')) {
      this.todos = this.todos.filter(t => t.id !== id);
    }
  }

  startEdit(todo: Todo): void {
    this.editingId = todo.id;
    this.editTitle = todo.title;
    this.editDescription = todo.description;
    this.editPriority = todo.priority;
  }

  cancelEdit(): void {
    this.editingId = null;
    this.editTitle = '';
    this.editDescription = '';
  }

  saveEdit(id: number): void {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.title = this.editTitle;
      todo.description = this.editDescription;
      todo.priority = this.editPriority;
      this.editingId = null;
    }
  }

  clearCompleted(): void {
    this.todos = this.todos.filter(t => !t.completed);
  }

  getPriorityClass(priority: string): string {
    return `priority-${priority}`;
  }
}