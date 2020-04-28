import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: string[] = [];

  add(message: string) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }

  /*
    the service exposes its cache of messages nad two methods;

    one to add() a message to the cache and another to clear() the cache.
  */ 

}