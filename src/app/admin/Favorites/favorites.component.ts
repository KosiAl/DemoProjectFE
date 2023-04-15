import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { removeFromFavorites } from '../../Store/actions';
import { Book } from '../../Shared/Interfaces/books';

@Component({
    selector: 'app-favorites',
    templateUrl: './favorites.component.html',
    styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit, OnDestroy {
    books$: Observable<{ favorites: Book[] }>;
    totalPages = 0;

    bookSubscription: any;

    constructor(private store: Store<{ book: { favorites: Book[] } }>) {
        this.books$ = this.store.select('book');
    }

    ngOnInit() {
        this.bookSubscription = this.books$.subscribe((data) => {
            let books = data.favorites;
            // calculate total pages
            this.totalPages = books.reduce((acc: number, book: Book) => {
                return acc + book.numberOfPages;
            }, 0);
        });
    }

    ngOnDestroy() {
        this.bookSubscription.unsubscribe();
    }

    removeBook(book: Book) {
        this.store.dispatch(removeFromFavorites({ book }));
    }
}
