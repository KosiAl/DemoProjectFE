import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Book } from '../Interfaces/books';

@Injectable({
    providedIn: 'root',
})
export class ListService {
    
    constructor(public http:HttpClient) {}
    getAllBooks(): Promise<Book[]> {
        return new Promise((resolve, reject) => {
            firstValueFrom(
                this.http.get('https://anapioficeandfire.com/api/books'))
            .then(result => resolve(result as Book[]))
            .catch(error => reject(error));
        });
    }
    
    getBookInfo(id: string): Promise<Book> {
        return new Promise((resolve, reject) => {
            firstValueFrom(
                this.http.get('https://anapioficeandfire.com/api/books/' + id))
            .then(result => resolve(result as Book))
            .catch(error => reject(error));
        });
    }

    async request<T>(
        promise: Promise<T>
      ): Promise<[Error | null, T | null]> {
        try {
          const result = await promise;
          return [null, result];
        } catch (error:any) {
          return [error, null];
        }
      }
}
