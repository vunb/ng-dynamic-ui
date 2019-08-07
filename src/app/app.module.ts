import { BrowserModule } from '@angular/platform-browser';
import { NgModule, COMPILER_OPTIONS, CompilerFactory, Compiler } from '@angular/core';

import { AppComponent } from './app.component';
import { DynamicTestAComponent } from '@app/dynamic/dynamic-testa.component';
import { JitCompilerFactory } from '@angular/platform-browser-dynamic';
import { DynamicLoaderService } from '@app/dynamic/dynamic-loader.service';

export function createCompiler(fn: CompilerFactory): Compiler {
  return fn.createCompiler();
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    DynamicLoaderService,
    // Dynamic compilation, support for normal operation of ui/src/app/page/data-ui after publishing
    // Must set angular.json aot=false buildOptimizer=false, officially released for normal operation
    {
      provide: COMPILER_OPTIONS,
      useValue: {},
      multi: true
    },
    {
      provide: CompilerFactory,
      useClass: JitCompilerFactory,
      deps: [COMPILER_OPTIONS]
    },
    {
      provide: Compiler,
      useFactory: createCompiler,
      deps: [CompilerFactory]
    },
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    DynamicTestAComponent
  ]
})
export class AppModule { }
