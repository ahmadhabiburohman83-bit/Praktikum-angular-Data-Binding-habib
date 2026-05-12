import { ComponentFixture, TestBed } from '@angular/core/testing';

// 1. Perbaiki jalur import dan nama class-nya
import { TodoAppComponent } from './todo-app.component';

describe('TodoAppComponent', () => {
  // 2. Ganti TodoApp menjadi TodoAppComponent
  let component: TodoAppComponent;
  let fixture: ComponentFixture<TodoAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // 3. Masukkan ke dalam imports
      imports: [TodoAppComponent],
    }).compileComponents();

    // 4. Create component menggunakan nama class yang benar
    fixture = TestBed.createComponent(TodoAppComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});