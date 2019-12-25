import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { UserData } from './user-info/user-info-data';
import { UserInfoComponent } from './user-info/user-info.component';
import { UserInfoService } from './user-info/user-info.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    InMemoryWebApiModule.forRoot(UserData, { dataEncapsulation: false }),
    HttpClientModule
  ],
  declarations: [AppComponent, UserInfoComponent],
  bootstrap: [AppComponent],
  providers: [UserInfoService]
})
export class AppModule {}
