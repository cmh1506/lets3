import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { WebsocketService } from '../service/websocket.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  standalone: false
})
export class MainComponent { 

  constructor(
    private fb: FormBuilder,
    private ws: WebsocketService
  ) { }

  message$ = this.ws.message$

  chatForm = this.fb.group({
    message: ''
  })

  sendMessage(){
    const msg: string | null = this.chatForm.getRawValue().message
    if (msg) {
      this.ws.sendMessage(msg)
    }    
  }

  
}
