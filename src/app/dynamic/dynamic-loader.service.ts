import {
    Compiler,
    Component,
    ComponentFactory,
    ComponentFactoryResolver,
    ComponentRef,
    Inject,
    Injectable,
    Type,
    ViewContainerRef
  } from '@angular/core';

import { IDynamicDataComponent } from './dynamic-data.component';

@Injectable()
  export class DynamicLoaderService {
    // config via setter, cause by DynamicLoaderService is a service (not a
    // component)
    private rooViewContainer: ViewContainerRef;

    constructor(
      @Inject(ComponentFactoryResolver) private factoryResolver: ComponentFactoryResolver
    ) { }

    setRootViewContainerRef(viewContainerRef) {
      this.rooViewContainer = viewContainerRef;
    }

    createDynamicComponent(dynamicView: Type<IDynamicDataComponent>, data?: any,
                           options?: any, addSheet?: Function) {
      if (typeof dynamicView === 'undefined') {
        return null;
      }

      const factory = this.factoryResolver.resolveComponentFactory(dynamicView);
      const component = factory.create(this.rooViewContainer.parentInjector);

      const myComponent: IDynamicDataComponent =
        component.instance as IDynamicDataComponent;
      myComponent.data = data;
      myComponent.options = options;
      myComponent.addSheet = addSheet;
      myComponent.cmpInstance = component;

      this.rooViewContainer.clear();
      this.rooViewContainer.insert(component.hostView);
      return myComponent;
    }

    createNewComponentLoader(viewContainerRef) {
      const loader = new DynamicLoaderService(this.factoryResolver);
      loader.setRootViewContainerRef(viewContainerRef);
      return loader;
    }

    resolveComponentFactory(dynamicView: Type<IDynamicDataComponent>) {
      return this.factoryResolver.resolveComponentFactory(dynamicView);
    }

    /**
     * V2:
     * @param dynamicView
     * @param dataUi
     */

    createNewComponent(dynamicView: Type<IDynamicDataComponent>, dataUi: any) {
      const dynamicComponent = Component({
        styles: [dataUi.style || ''],
        template: dataUi.template,
        encapsulation: dataUi.encapsulation || 0
      })(dynamicView);

    }
  }
  // https://github.com/xiyuan-fengyu/ppspider/blob/9beb835a49350220f4333c6b24734a359ac5f59e/ui/src/app/service/dynamic.service.ts
  // https://github.com/xiyuan-fengyu/ppspider/blob/master/src/spider/data-ui/DbHelper.ts
  // https://github.com/xiyuan-fengyu/ppspider/blob/9beb835a49350220f4333c6b24734a359ac5f59e/src/spider/decorators/DataUi.ts
  // https://stackoverflow.com/questions/34465214/access-meta-annotation-inside-class-typescript
