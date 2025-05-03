import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule], // FormsModule enables ngModel for two-way binding
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  tasks: { text: string; completed: boolean }[] = [];
  newTask: string = ''; // Bound to input field via [(ngModel)]
  editIndex: number | null = null;

  addOrUpdateTask() {
    if (this.newTask.trim() === '') return;

    if (this.editIndex !== null) {
      // Update existing task using newTask, which is synced with input
      this.tasks[this.editIndex].text = this.newTask;
      this.editIndex = null;
    } else {
      // Add new task from newTask
      this.tasks.push({ text: this.newTask, completed: false });
    }
    this.newTask = ''; // Clear input field, updates view via two-way binding
  }

  editTask(index: number) {
    this.newTask = this.tasks[index].text; // Set newTask, updates input field via two-way binding
    this.editIndex = index;
  }

  deleteTask(index: number) {
    this.tasks.splice(index, 1);
    if (this.editIndex === index) {
      this.clearForm();
    } else if (this.editIndex !== null && this.editIndex > index) {
      this.editIndex--;
    }
  }

  toggleComplete(index: number) {
    this.tasks[index].completed = !this.tasks[index].completed;
  }

  clearForm() {
    this.newTask = ''; // Clear input field, updates view via two-way binding
    this.editIndex = null;
  }
}