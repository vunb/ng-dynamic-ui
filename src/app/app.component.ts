import { Component, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-dynamic-ui';

  @ViewChild('dynamic', {
    static: true,
    read: ViewContainerRef
  }) viewContainerRef: ViewContainerRef;


}
