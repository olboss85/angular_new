import {Component, OnInit} from '@angular/core';
import {Task} from "../shared/models/task.model";
import {TaskStorageService} from "../task-storage.service";
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.css']
})
export class TaskViewComponent implements OnInit {

  task: Task;

  constructor(private storage: TaskStorageService, private route: ActivatedRoute, private router: Router) {
  }

  /**
   *  Load task from route id parameter
   */
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = +params.get('id'); 
      this.task = this.storage.get(id);
    });
  }

  delete(id): void {
    // this.storage.delete(this.task.id);
    this.router.navigate(['/tasks'])
  }

  updateStatus(id: number): void {
    this.storage.updateStatus(id, "finished");
    this.router.navigate(['/tasks']);
  }
}
