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
  html = `Say <strong style="color:green;">{{test}}</strong> from {{name}}!
  `;

  constructor(
    private dynamicService: DynamicLoaderService,
  ) {}

  @ViewChild('dynamic', {
    // static: true,
    read: ViewContainerRef
  }) dynamic: ViewContainerRef;

  ngOnInit() {
    this.dynamicService.createDynamicComponent(this.dynamic, DynamicTestAComponent);
  }

  template1() {
    this.dynamicService.createDynamicComponent(this.dynamic, DynamicTestAComponent, {
      formType: 'template1',
      template: '<h2>Prints model `test`: {{test}}, author: {{name}}',
    });
  }

  template2() {
    this.dynamicService.createDynamicComponent(this.dynamic, DynamicTestAComponent, {
      formType: 'template2',
      template: '<h2>This is a dynamic template!',
      style: `h2 {color: red;}`
    });
  }

  customHtml() {
    this.dynamicService.createDynamicComponent(this.dynamic, DynamicTestAComponent, {
      formType: 'custom',
      template: this.html,
      noCache: true,
    });
  }

}
