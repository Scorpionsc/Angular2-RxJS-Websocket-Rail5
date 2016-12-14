import {Component, OnDestroy}   from '@angular/core';
import { Message }            from '../things/message';
import {WebSocketService} from "../services/websocket.service";
import {ChatChannelService} from "../services/chat.channel.service";

@Component({
    selector: 'chat',
    templateUrl: 'app/templates/chat.component.html',
    styleUrls: ['app/css/chat.component.css']
})
export class ChatComponent implements OnDestroy{

    messages: Message[] = [];

    newMessageData: Object = { name: '', text: '',action: 'create' };

    chatSubscribed:boolean = false;

    constructor( private chatChannelService:ChatChannelService, private webSocketService:WebSocketService ){
        this.webSocketService.start();

        let self = this;

        this.chatChannelService.subscribed.subscribe( ( data:boolean ) => {
            self.chatSubscribed = data;
            if( data ){
                this.getAllMessages();
            }
        } );

        this.chatChannelService.observableData.subscribe( ( data:Object ) => {
            self.messages = data['messages']
        } );
    }

    private getAllMessages():void {

        this.chatChannelService.send( { action: 'index' } );

    }

    ngOnDestroy():void {
        this.chatChannelService.unsubscribe();
        this.webSocketService.close();
    }

    private sendMessage():void{

        this.chatChannelService.send( this.newMessageData );

        this.newMessageData = { name: '', text: '',action: 'create' }
    }

    public onSubmit():void {
        this.sendMessage();
    }

    public timestamp_to_date(timestamp:number ):string{

        let date = new Date();

        date.setTime( timestamp * 1000 );

        return `${ date.getHours() }:${ date.getMinutes() } ${ date.getDate() }-${ ( date.getMonth() + 1 ) }-${ date.getFullYear() }`;

    }
}