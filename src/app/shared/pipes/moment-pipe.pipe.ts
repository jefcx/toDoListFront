import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'momentPipe'
})
export class MomentPipePipe implements PipeTransform {


  transform(date: moment.Moment, format?: string): any {
    if (date) {
      if (format) {
        return date.locale('fr').format(format);
      }
      return date.locale('fr').format('MMMM Do YYYY, h:mm:ss a');
    }
    return null;
  }
}
