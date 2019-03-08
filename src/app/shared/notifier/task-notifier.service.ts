import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskNotifierService {
  private behaviourSubjectTask: BehaviorSubject<any>;
  private behaviourSubjectModifyTask: BehaviorSubject<any>;

  public taskShare;
  public taskModifyShare;

  constructor() {
    this.behaviourSubjectTask = new BehaviorSubject<any>(null);
    this.behaviourSubjectModifyTask = new BehaviorSubject<any>(null);

    this.taskShare = this.behaviourSubjectTask.asObservable();
    this.taskModifyShare = this.behaviourSubjectModifyTask.asObservable();
   }

  public sendTask(task: any): void {
    this.behaviourSubjectTask.next(task);
  }

  public sendModifyTask(task: any): void {
    this.behaviourSubjectModifyTask.next(task);
  }

}
