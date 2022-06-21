import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { List } from 'src/app/models/list.model';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/task.service';
import * as Aos from 'aos';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss'],
})
export class TaskViewComponent implements OnInit {
  lists: List[];
  tasks: Task[];
  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    Aos.init();
    this.route.params.subscribe((params: Params) => {
      if (params.listId) {
        this.taskService.getTasks(params.listId).subscribe((tasks: Task[]) => {
          this.tasks = tasks;
        });
      } else{
        this.tasks = undefined!;
      }

    });

    this.taskService.getLists().subscribe((lists: List[]) => {
      this.lists = lists;
    });
  }
  onTaskClick(task: Task) {
    /* we want to set the task to completed */
    this.taskService.complete(task).subscribe(()=>{
      console.log("completed succesfully!");
      task.completed = !task.completed;

    })
  }
}
