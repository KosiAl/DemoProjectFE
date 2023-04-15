import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ListService {
    
    constructor(public http:HttpClient) {}

    getAllBooks() {
        let promise = new Promise((resolve, reject) => {
            resolve(firstValueFrom(this.http.get('https://anapioficeandfire.com/api/books')));
        })
        return promise; 
    }

    getBookInfo(id:string) {
        let promise = new Promise((resolve, reject) => {
            resolve(firstValueFrom(this.http.get('https://anapioficeandfire.com/api/books/' + id)));
        })
        return promise; 
    }
}
