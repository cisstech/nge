import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { ApplicationConfig, mergeApplicationConfig } from '@angular/core'
import { provideServerRendering, withRoutes } from '@angular/ssr'

import { appConfig } from './app.config'
import { serverRoutes } from './app.routes.server'
import { PrerenderAssetsInterceptor } from './prerender-assets.interceptor'

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(withRoutes(serverRoutes)),
    // `withInterceptorsFromDi()` in the base config picks this up (server only).
    { provide: HTTP_INTERCEPTORS, useClass: PrerenderAssetsInterceptor, multi: true },
  ],
}

export const config = mergeApplicationConfig(appConfig, serverConfig)
