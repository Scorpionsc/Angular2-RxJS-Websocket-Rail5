import { Injectable } from "@angular/core";
import {Subject, Observable, Subscription}    from 'rxjs/Rx';
import { WebSocketSubject } from "rxjs/observable/dom/WebSocketSubject";

@Injectable()
export class WebSocketService {

    private ws: WebSocketSubject<Object>;

    private socket: Subscription;

    message: Subject<Object> = new Subject();

    opened: Subject<boolean> = new Subject();

    constructor(){}

    sendMessage( message:string ):void{
        this.ws.next(message);
    }

    public start():void{
        let self = this;

        this.ws = Observable.webSocket('ws://localhost:3000/cable');

        console.log( this.ws.constructor.name );

        this.socket = this.ws.subscribe({
            next: (data:MessageEvent) => {
                if( data[ 'type' ] == 'welcome' ){
                    self.opened.next( true );
                }
                this.message.next( data );
            },
            error: () => {

                self.opened.next( false );
                this.message.next( { type: 'closed' } );

                self.socket.unsubscribe();

                setTimeout( () => {
                    self.start();
                }, 1000 );

            },
            complete: () => {
                this.message.next( { type: 'closed' } );
            }
        });


    }

    public close():void{
        this.ws.complete();
    }

}