import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'img'
})
export class AvatarPipe implements PipeTransform {

  transform(value: string | undefined): string {
    if(value == undefined || value == null || value == "") {
      return "/assets/images/not-image.jpg";
    }
    return value;
  }
}
