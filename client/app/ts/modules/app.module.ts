import { BrowserModule }        from '@angular/platform-browser';
import { FormsModule }          from "@angular/forms";
import { NgModule }             from '@angular/core';

import { AppComponent }         from '../components/app.component';
import { ChatComponent }        from "../components/chat.component";

import { ChatChannelService }   from "../services/chat.channel.service";
import { WebSocketService }     from "../services/websocket.service";


@NgModule({
    imports: [
        BrowserModule,
        FormsModule
    ],
    declarations: [
        AppComponent,
        ChatComponent
    ],
    providers: [
        ChatChannelService,
        WebSocketService
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
