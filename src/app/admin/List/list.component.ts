import { Component, OnInit } from '@angular/core';
import { ListService } from '../../Shared/Services/list.service';
import { Store } from '@ngrx/store';
import { addToFavorites, removeFromFavorites } from '../../Store/actions';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Book } from '../../Shared/Interfaces/books';

type SortableProperty = keyof Pick<Book, 'name' | 'country' | 'mediaType' | 'numberOfPages' | 'released' | 'publisher'>;

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
    books: Book[] = [];
    booksCopy: Book[] = [];

    searchVal = '';
    sortState = 'dec';
    sortProperty = 'name';

    constructor(private service: ListService, private router: Router, private store: Store<{ book: { favorites: Book[] } }>) {}

    // This function is used to get all the books from the API and sync the selected books with the store
    async ngOnInit() {
        await this.getBooksAndMakeCopy();
        this.syncSelectedFavorites();
    }

    // This function is used to get all the books from the API and make a copy of the data
    async getBooksAndMakeCopy() {
        let [error, data] = await this.service.request(this.service.getAllBooks());
        if (data) {
            this.booksCopy = [...data];
            this.books = data;
        }
        if(error) {
            alert('Error: Server offline');
        }
    }


    // This function is used to sync the selected books with the store
    syncSelectedFavorites() {
        this.store
            .select('book')
            .pipe(take(1))
            .subscribe(({ favorites }: { favorites: Book[] }) => {
                this.books.forEach((book: Book) => {
                    book.selected = favorites.some((favBook) => favBook.name === book.name);
                });
            });
    }

    // This function is used to open the detail page of the book
    openDetailPage(book: Book) {
        let id = book.url.split('/books/').pop();
        this.router.navigate(['admin', 'dialog', id]);
    }

    // This function is used to filter the table by the search value
    filterTable(value: string) {
        value = value.toLowerCase();
        this.searchVal = value;
        this.books = this.booksCopy.filter((item: Book) => {
            return (
                item.name.toString().toLowerCase().includes(value) ||
                item.country.toString().toLowerCase().includes(value) ||
                item.mediaType.toString().toLowerCase().includes(value) ||
                item.numberOfPages.toString().toLowerCase().includes(value) ||
                item.released.toLowerCase().includes(value) ||
                item.publisher.toString().toLowerCase().includes(value)
            );
        });
    }

    // This function is used to sort the table by the property of the column
    private sortBooksByProperty(property: SortableProperty, sortOrder: 'asc' | 'desc'): void {
        this.books.sort((a: Book, b: Book) => {
            const aVal = isNaN(a[property] as any) ? a[property] : parseFloat(a[property] as any);
            const bVal = isNaN(b[property] as any) ? b[property] : parseFloat(b[property] as any);

            if (sortOrder === 'asc') {
                return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
            } else {
                return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
            }
        });
    }

    sortByTableColumn(property: SortableProperty) {
        // If the property of column changes, set the sort state to default
        if (this.sortProperty !== property) {
            this.sortState = 'dec';
        }
        this.sortProperty = property;

        switch (this.sortState) {
            case 'dec':
                this.sortBooksByProperty(property, 'desc');
                this.sortState = 'asc';
                break;
            case 'asc':
                this.sortBooksByProperty(property, 'asc');
                this.sortState = 'def';
                break;
            case 'def':
                this.filterTable(this.searchVal);
                this.sortState = 'dec';
                break;
        }
    }

    // This function is used to add/remove the book to/from the store
    onBookSelect(input: any, book: Book) {
        if (input.checked) {
            book.selected = true;
            this.store.dispatch(addToFavorites({ book: { ...book } }));
        } else {
            book.selected = false;
            this.store.dispatch(removeFromFavorites({ book: { ...book } }));
        }
    }
}
