import { ApplicationConfig, mergeApplicationConfig } from '@angular/core'
import { provideServerRendering, withRoutes } from '@angular/ssr'
import { provideNgeDocSsr } from '@cisstech/nge/doc/ssr'

import { appConfig } from './app.config'
import { serverRoutes } from './app.routes.server'

const serverConfig: ApplicationConfig = {
  providers: [provideServerRendering(withRoutes(serverRoutes)), provideNgeDocSsr({ roots: ['projects/demo/public'] })],
}

export const config = mergeApplicationConfig(appConfig, serverConfig)
