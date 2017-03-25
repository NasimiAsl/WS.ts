namespace chat {

    export class ws {

        public socket: WebSocket;

        onOpen(): void {
            console.log('open socket!');
        }

        onClose(e): void {
            console.log('close socket! ' + e);
        }

        onMessage(data): void {
             
           this.onResive(data);
        }

        onResive(data): void { 

            console.log(data );
        }

        onError(e): void {
            console.log(e);
        }

        send(msg: string): void {

            if (this.socket.readyState == WebSocket.OPEN) {
                this.socket.send(msg);
            }
            else {
                this.onError('request after closed!');
            }

        }

        close(): void {
            this.socket.close();
        }

        constructor(url: string, msg: any, open: any, close: any,) {
            this.socket = new WebSocket("ws://" + url);
            if (open)
                this.onOpen = open;
            if (msg)
                this.onResive = msg;
            if (close)
                this.onClose = close;

            var me = this;

            this.socket.addEventListener("open", function (evt) {
                me.onOpen();
            }, false);

            this.socket.addEventListener("close", function (evt) {
                me.onClose(evt.reason);
            }, false);

            this.socket.addEventListener("message", function (evt) {
                me.onMessage(evt.data);
            }, false);

            this.socket.addEventListener("error", function (evt) {
                me.onError(evt);
            }, false);


        }

    }
}
