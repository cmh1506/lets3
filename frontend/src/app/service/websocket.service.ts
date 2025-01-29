import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { UserState } from '../+state/user.reducer';
import { selectUserId } from '../+state/user.selectors';



@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  ws!: WebSocket

  message$ = new BehaviorSubject<string>("Liebling, es ist aus.")

  constructor(
    private store: Store<UserState>
  ) {
    const id = this.store.select(selectUserId).subscribe(id => {
      this.ws = new WebSocket(`ws://localhost:3001?userId=${id}`);
      this.ws.addEventListener("error", console.error);

      this.ws.addEventListener("open", () => {
        //this.ws.send("Eine Stadt ohne Helden ist eine Stadt ohne Zukunft.")
      });

      this.ws.addEventListener("close", () => {
        this.message$.next("WebSockets connection closed.")
      });

      this.ws.addEventListener("message", ({ data }) => {
        this.message$.next(data)
      });

    })

  }

  sendMessage(msg: string) {
    if (msg === "exit") this.ws.close();
    else if (msg) {      
      this.ws.send(JSON.stringify(msg));
    }
  }

}
