import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavigationComponent } from './navigation/navigation.component';
import { AboutComponent } from './about/about.component';
import { TestComponent } from './test/test.component';
import { ResultsComponent } from './results/results.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule} from './material';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    AboutComponent,
    TestComponent,
    ResultsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    InfiniteScrollModule
  ],
  providers: [TestComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
