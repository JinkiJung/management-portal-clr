import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';


import { DocControllerService } from './api/docController.service';
import { InstanceControllerService } from './api/instanceController.service';
import { LedgerRequestControllerService } from './api/ledgerRequestController.service';
import { XmlControllerService } from './api/xmlController.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: [
    DocControllerService,
    InstanceControllerService,
    LedgerRequestControllerService,
    XmlControllerService ]
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders<ApiModule> {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
