import { Injectable } from "@angular/core";
import { Subject, Observable }    from 'rxjs/Rx';
import { WebSocketSubject } from "rxjs/observable/dom/WebSocketSubject";

@Injectable()
export class WebSocketService {

    private ws: any;

    private socket: WebSocketSubject<MessageEvent>;

    message: Subject<Object> = new Subject();

    opened: Subject<boolean> = new Subject();

    constructor(){}

    sendMessage( message:string ):void{
        this.ws.next(message);
    }

    public start():void{
        let self = this;

        this.ws = Observable.webSocket('ws://localhost:3000/cable');

        this.socket = this.ws.subscribe({
            next: (data:MessageEvent) => {
                if( data[ 'type' ] == 'welcome' ){
                    self.opened.next( true );
                }
                this.message.next( data );
            },
            error: (err:Object) => {

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
        this.socket.complete();

    }

}