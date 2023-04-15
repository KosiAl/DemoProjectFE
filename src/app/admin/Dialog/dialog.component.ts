import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListService } from '../../Shared/Services/list.service';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { addToFavorites, removeFromFavorites } from '../../Store/actions';
import { Book } from '../../Shared/Interfaces/books';

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
    id: string = '';
    book: Book = {
        url: '',
        name: '',
        isbn: '',
        authors: [],
        numberOfPages: 0,
        publisher: '',
        country: '',
        mediaType: '',
        released: '',
        characters: [],
        povCharacters: []
    };
    isFav = false;

    constructor(private route: ActivatedRoute, private service: ListService, private store: Store<{ book: { favorites: Book[] } }>) {}

    // This function is used to get the book info from the API and check if the book is already in the favorites
    async ngOnInit() {
        // Get the id from the url
        this.id = decodeURIComponent(this.route.snapshot.paramMap.get('id') ?? '');
        // Get the book info from the API
        if (this.id !== '') {
            let data: Book = await this.service.getBookInfo(this.id) as Book;
            this.book = data;
        }
        // Check if the book is already in the favorites and set the isFav variable
        this.isBookInFav();
    }

    // This function is used to add the book to the favorites
    addToFav() {
        this.store.dispatch(addToFavorites({ book: { ...this.book } }));
        this.isFav = true;
    }

    // This function is used to remove the book from the favorites
    removeFromFav() {
        this.store.dispatch(removeFromFavorites({ book: { ...this.book } }));
        this.isFav = false;
    }

    // This function is used to check if the book is already in the favorites
    isBookInFav() {
        this.store
            .select('book')
            .pipe(take(1))
            .subscribe(({ favorites }: { favorites: Book[] }) => {
                this.isFav = favorites.some(book => book.name === this.book.name);
            });
    }
}
