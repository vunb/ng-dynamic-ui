import {
  Compiler,
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  Inject,
  Injectable,
  Type,
  ViewContainerRef,
  NgModule,
  Injector,
  NgModuleRef,
} from '@angular/core';

import { IDynamicDataComponent } from './dynamic-data.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

interface DataUiFactory {
  factory: ComponentFactory<any>;
  dataUi: any;
}

@Injectable({
  providedIn: 'root'
})
export class DynamicLoaderService {
  // config via setter, cause by DynamicLoaderService is a service (not a
  // component)
  private rooViewContainer: ViewContainerRef;
  private dynamicFactories: {
    [className: string]: DataUiFactory
  } = {};

  constructor(
    @Inject(ComponentFactoryResolver) private factoryResolver: ComponentFactoryResolver,
    private compiler: Compiler,
    private injector: Injector,
    private module: NgModuleRef<any>,
  ) { }

  /**
   * V2:
   * @param dynamicView
   * @param dataUi
   */
  private async dynamicFactory(
    dynamicView: Type<IDynamicDataComponent>,
    dataUi: any
  ): Promise<DataUiFactory> {

    dataUi = dataUi || {};
    // Must clear cache.
    this.compiler.clearCache();

    const componentName = dataUi.formType || dynamicView.name;
    const dataUiFactory = this.dynamicFactories[componentName];
    if (dataUiFactory && !dataUi.noCache) {
      return dataUiFactory;
    }

    const dynamicComponent = Component({
      styles: [dataUi.style || ''],
      template: dataUi.template || 'Hello',
      encapsulation: dataUi.encapsulation || 0
    })(dynamicView);

    @NgModule({}) class DynamicModule { }

    const dynamicModule = NgModule({
      declarations: [dynamicComponent],
      imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule
      ]
    })(DynamicModule);

    const factories = await this.compiler.compileModuleAndAllComponentsAsync(dynamicModule);
    const factory = factories.componentFactories[0];

    // const factory = this.factoryResolver.resolveComponentFactory(dynamicComponent);
    this.dynamicFactories[componentName] = {
      factory,
      dataUi,
    };
    return this.dynamicFactories[componentName];
  }

  createDynamicComponent(container: ViewContainerRef, dynamicView: Type<IDynamicDataComponent>, dataUi?: any) {
    this.dynamicFactory(dynamicView, dataUi).then((dataUiFactory) => {

      const cmpRef = dataUiFactory.factory.create(this.injector, [], null, this.module);

      this.clearDynamicCache(container);
      // dynamic._cache = {
      //   component: cmpRef,
      //   subscribe
      // };
      container.insert(cmpRef.hostView);
    });
  }

  // noinspection JSMethodCanBeStatic
  private clearDynamicCache(dynamic: ViewContainerRef) {
    // const cache = (dynamic as any)._cache as ComponentAndSubscribe;
    // if (cache) {
    //   cache.component.destroy();
    //   cache.subscribe.unsubscribe();
    // }
    dynamic.clear();
  }

}
  // https://github.com/xiyuan-fengyu/ppspider/blob/9beb835a49350220f4333c6b24734a359ac5f59e/ui/src/app/service/dynamic.service.ts
  // https://github.com/xiyuan-fengyu/ppspider/blob/master/src/spider/data-ui/DbHelper.ts
  // https://github.com/xiyuan-fengyu/ppspider/blob/9beb835a49350220f4333c6b24734a359ac5f59e/src/spider/decorators/DataUi.ts
  // https://stackoverflow.com/questions/34465214/access-meta-annotation-inside-class-typescript
  // https://medium.com/front-end-weekly/dynamically-add-components-to-the-dom-with-angular-71b0cb535286
