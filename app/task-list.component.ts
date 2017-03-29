import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from './task.model';

@Component({
  selector: 'task-list',
  template:`
  <select (change)="onChange($event.target.value)">
    <option value="allTasks">Al Tasks</option>
    <option value="completedTasks">Completed Tasks</option>
    <option value="incompleteTasks" selected="selected">Incompleted Tasks</option>
  </select>
  <ul>
    <li (click)="isDone(currentTask)" *ngFor="let currentTask of childTaskList | completeness:filterByCompleteness">{{currentTask.description}}
    <input *ngIf="currentTask.done === true" type="checkbox" checked (click)="toggleDone(currentTask, false)"/>
    <input *ngIf="currentTask.done === false" type="checkbox" (click)="toggleDone(currentTask, true)"/>
    <button (click)="editButtonHasBeenClicked(currentTask)">Edit!</button></li>
  </ul>

  `
})


export class TaskListComponent {
  @Input() childTaskList: Task[];
  @Output() clickSender = new EventEmitter();
  filterByCompleteness: string = "incompleteTasks";


  editButtonHasBeenClicked(taskToEdit: Task) {
    this.clickSender.emit(taskToEdit);
  }

  isDone(clickedTask: Task ) {
    if(clickedTask.done === true) {
      alert("This task is done!");
    }else {
      alert("This task is not done. Better get to work");
    }
  }


  priorityColor(currentTask){
    if(currentTask.priority === 3){
      return "bg-danger";
    }else if (currentTask.priority === 2) {
      return "bg-warning";
    }else {
      return "bg-info";
    }
  }
  onChange(optionFromMenu){
    this.filterByCompleteness = optionFromMenu;
  }

  toggleDone(clickedTask: Task, setCompleteness: boolean) {
    clickedTask.done = setCompleteness;
  }

}
