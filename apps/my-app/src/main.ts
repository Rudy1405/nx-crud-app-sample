import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

import { importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app/app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Import NGXS Modules
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin'; 
import { AppState } from './app/shared/state/app.state';

const ngxsProviders = [
  importProvidersFrom(
    NgxsModule.forRoot([AppState]), // Incluir AppState aquí
    NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsStoragePluginModule.forRoot({ keys: ['app.token', 'app.currentItem'] }) // Configurar el plugin de almacenamiento
  )
];

const newAppConfig = {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    ...ngxsProviders,
    provideRouter(appRoutes),
    importProvidersFrom(BrowserAnimationsModule)
  ]
};

bootstrapApplication(AppComponent, newAppConfig).catch((err) =>
  console.error(err)
);


/**
 * Cliente usa NX para monorepo
 * 
 * 1)
 * mono lib de componentes com[patridos], usar diff proyects y usar librerias similares
 * falta el folder de lib compartidas el /libs y la /shared que ahi se tenga la ui o los datos compartidos y el storage
 * revisa el nx.dev documentacion angular mono repo
 * tomar mi shared creatdo y hacerlo a la altura de /apps 
 * 
 * 2) Crear formulario en el modal que sea dinamico osea es un formulario dinamico 
 *    que sirva para agregar categoria,  Angular FormBuilder 
 * 
 * 
 * 3)  boton para editar en el datagrid y abra el formulario y editarlo 
 * 4) boton para eliminar 
 * 5) mi componente dummy que esl el datagrid en los botones manda un EMIT a sus padres osea el category
 * 
 * TIP: al usar los shared en el import the esos shared en category  el tscofig.base.json ahora tiene el atrr paths y ahi se ponen las nuevas rutas  
 * 
 * 
 */