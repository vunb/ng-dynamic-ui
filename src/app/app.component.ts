import { Component, ViewChild, ViewContainerRef, OnInit } from '@angular/core';
import { DynamicLoaderService } from '@app/dynamic/dynamic-loader.service';
import { DynamicTestAComponent } from '@app/dynamic/dynamic-testa.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ng-dynamic-ui';

  constructor(
    private dynamicService: DynamicLoaderService,
  ) {}

  @ViewChild('dynamic', {
    static: true,
    read: ViewContainerRef
  }) dynamic: ViewContainerRef;

  ngOnInit() {
    this.dynamicService.createDynamicComponent(this.dynamic, DynamicTestAComponent);
  }

}
