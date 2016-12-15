import { Injectable }                           from "@angular/core";
import { Subject, Observable, Subscription }    from 'rxjs/Rx';
import { WebSocketSubject }                     from "rxjs/observable/dom/WebSocketSubject";

@Injectable()
export class WebSocketService {

    private ws: WebSocketSubject<Object>;
    private socket: Subscription;
    private url: string;

    public message: Subject<Object> = new Subject();
    public opened: Subject<boolean> = new Subject();

    public close():void{
        this.socket.unsubscribe();
        this.ws.complete();
    }

    public sendMessage( message:string ):void{
        this.ws.next( message );
    }

    public start( url: string ):void{
        let self = this;

        this.url = url;

        this.ws = Observable.webSocket( this.url );

        this.socket = this.ws.subscribe( {

            next: ( data:MessageEvent ) => {
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
                    self.start( self.url );
                }, 1000 );

            },
            complete: () => {
                this.message.next( { type: 'closed' } );
            }

        } );

    }

}