import { Component, OnInit } from '@angular/core';
import { TaskStorageService } from '../task-storage.service';
import { Task } from '../shared/models/task.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  tasks: Task[];

  constructor(private storage: TaskStorageService) {}

  ngOnInit(): void {
    this.storage.init();
    this.tasks = this.storage.getTasks();
  }

  delete(id): void {
    const taskToDelete = this.tasks.find(task => task.id === id);
    if (taskToDelete && taskToDelete.status === 'finished') {
      this.storage.delete(id);
      this.tasks = this.storage.getTasks();
    } else {
      alert("Нельзя удалить задачу, пока задача не выполнена");
    }
  }

  getStarsArray(difficulty: number): number[] {
    return Array.from({ length: 5 }, (_, index) => index);
  }
}