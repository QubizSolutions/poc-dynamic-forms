import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Routing } from './app.routing';
import { MaterialModule } from '@angular/material';


//Modules
import { ConfigModule } from './config/config.module';
import { DisplayModule } from './display/display.module';

//Components
import { AppComponent } from './app.component';

@NgModule({
    imports: [
        RouterModule,
        BrowserModule,
        HttpModule,
        FormsModule,
        Routing,
        MaterialModule.forRoot(),
        ConfigModule,
        DisplayModule
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
