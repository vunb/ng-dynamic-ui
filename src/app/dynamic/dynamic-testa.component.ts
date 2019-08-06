import { Component } from '@angular/core';
import { IDynamicDataComponent } from '@app/dynamic/dynamic-data.component';

@Component({
  selector: 'app-dynamic-testa',
  template: './dynamic-testa.component.html'
})
export class DynamicTestAComponent implements IDynamicDataComponent {
  data: any;  options?: any;
  cmpInstance?: any;
  addSheet?: any;

  onSave(data?: any) {
    console.error(data);
  }

}
