import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
//conectar a firebase - agregarlos al decorador de providers
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getStorage, provideStorage } from '@angular/fire/storage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { from } from 'rxjs';
import { environment } from '@src/environments/environment';
import { IndicatorsModule } from './shared/indicators';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { PopupsModule } from './shared/popups';

import { NotificationModule } from './services';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from './components/header/header.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MenuListComponent } from './components/menu-list/menu-list.component';
import { MatListModule } from '@angular/material/list';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { effects, reducers } from './store';
import { HttpClientModule } from '@angular/common/http';
import { TestComponent } from './components/test/test.component';

//si NO estoy en un ambiente de produccion quiero que mantenga la informacion este tiempo, de lo contrario que este en produccion que sea dinamico
const StoreDevtools = !environment.production ? StoreDevtoolsModule.instrument( {maxAge: 50} ) : []

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuListComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase.config)), //llamo a mi archivo enviroment
    provideFirestore(() => getFirestore()), //iniciar firestore
    provideStorage(() => getStorage()),
    provideAuth(() => getAuth()),
    AngularFireModule.initializeApp(environment.firebase.config),
    AngularFireStorageModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    IndicatorsModule,
    BrowserAnimationsModule,
    PopupsModule,
    NotificationModule.forRoot(),
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatListModule,
    StoreDevtoolsModule,
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        strictActionImmutability: true,
        strictStateImmutability: true
      }
    }),
    EffectsModule.forRoot(effects),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
