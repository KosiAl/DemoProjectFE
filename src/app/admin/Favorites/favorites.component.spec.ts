import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { Store } from '@ngrx/store';
import { FavoritesComponent } from './favorites.component';
import { removeFromFavorites } from 'src/app/Store/actions';

describe('FavoritesComponent', () => {
    let component: FavoritesComponent;
    let fixture: ComponentFixture<FavoritesComponent>;
    let store: Store<any>;
    let fakeBook = {
        url: 'https://anapioficeandfire.com/api/books/1',
        name: 'A Game of Thrones',
        isbn: '978-0553103540',
        authors: ['George R. R. Martin'],
        numberOfPages: 694,
        publisher: 'Bantam Books',
        country: 'United States',
        mediaType: 'Hardcover',
        released: '1996-08-01T00:00:00',
        characters: [
          'https://anapioficeandfire.com/api/characters/2',
          'https://anapioficeandfire.com/api/characters/12',
          'https://anapioficeandfire.com/api/characters/13',
          // ...
        ],
        povCharacters: [
          'https://anapioficeandfire.com/api/characters/148',
          'https://anapioficeandfire.com/api/characters/208',
          'https://anapioficeandfire.com/api/characters/232',
          // ...
        ],
        selected: false,
      }

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [StoreModule.forRoot({})],
            declarations: [FavoritesComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FavoritesComponent);
        component = fixture.componentInstance;
        store = TestBed.inject(Store);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should dispatch removeFromFavorites action on removeBook()', () => {
        const book = fakeBook;
        const spy = spyOn(store, 'dispatch');
        component.removeBook(book);
        expect(spy).toHaveBeenCalledWith(removeFromFavorites({ book }));
    });
});
