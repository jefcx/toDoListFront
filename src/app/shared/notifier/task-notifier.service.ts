import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskNotifierService {
  private behaviourSubjectTask: BehaviorSubject<any>;
  public taskShare;

  constructor() {
    this.behaviourSubjectTask = new BehaviorSubject<any>(null);

    this.taskShare = this.behaviourSubjectTask.asObservable();
   }

  public sendTask(task: any): void {
    this.behaviourSubjectTask.next(task);
  }

}
