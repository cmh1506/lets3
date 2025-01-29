import { Component, inject, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { WebsocketService } from '../service/websocket.service';
import { DialogData } from '../user/user-list/user-list.component';


@Component({
  selector: 'lets-chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrl: './chat-dialog.component.scss',
  standalone: false
})
export class ChatDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ChatDialogComponent>,
    private fb: FormBuilder,
    private ws: WebsocketService) { }

  readonly data = inject<DialogData>(MAT_DIALOG_DATA);

  messages: string[] = []

  pIndex: number = 0

  message$ = this.ws.message$.subscribe(m => {
    let hihi = null
    if (this.pIndex === 0) {
      hihi = document.getElementById("101")
    } else {
      //hihi = document.getElementById(this.pIndex.toString())
      hihi = document.getElementById("101")
    }
    
    let p = document.createElement('p')
    p.innerHTML = m
    p.setAttribute("style", "text-align: left; color: blue");
    p.id = (this.pIndex++).toString()
    hihi?.append(p)
    
    this.messages.push(m)
  })

  chatForm = this.fb.group({
    message: ''
  })

  sendMessage() {
    const msg: string | null = this.chatForm.getRawValue().message
    if (msg) {
      this.ws.sendMessage(JSON.stringify({"id": this.data.id, "msg": msg}))
    }
    this.chatForm.controls['message'].setValue('')
    let hihi = null
    if (this.pIndex === 0) {
      hihi = document.getElementById("101")
    } else {
      //hihi = document.getElementById(this.pIndex.toString())
      hihi = document.getElementById("101")
    }
    
    let p = document.createElement('p')
    p.innerHTML = msg || "Huhu"
    p.setAttribute("style", "text-align: right; color: grey");
    p.id = (this.pIndex++).toString()
    hihi?.append(p)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
