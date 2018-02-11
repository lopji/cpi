import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";


// @ngrx
import {EffectsModule} from "@ngrx/effects";
import {RouterStoreModule} from "@ngrx/router-store";
import {StoreModule} from "@ngrx/store";

// routing
import {AppRoutingModule} from "./app-routing.module";

// components
import {AppComponent} from "./app.component";
import {NotFoundComponent} from "./not-found/not-found.component";

// effects
import {UserEffects} from "./users/users.effects";

// guards
import {AuthenticatedGuard} from "./shared/authenticated.guard";

// reducers
import {reducer} from "./app.reducers";

// services
import {UserService} from "./core/services/user.service";
import {BookService} from "./core/services/book.service";

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    EffectsModule.run(UserEffects),
    RouterStoreModule.connectRouter(),
    StoreModule.provideStore(reducer, {
      router: window.location.pathname + window.location.search
    })
  ],
  providers: [
    AuthenticatedGuard,
    UserService,
    BookService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
