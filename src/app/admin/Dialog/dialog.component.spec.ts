import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DialogComponent } from './dialog.component';
import { ListService } from 'src/app/Shared/Services/list.service';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { addToFavorites, removeFromFavorites } from 'src/app/Store/actions';

describe('DialogComponent', () => {
    let component: DialogComponent;
    let fixture: ComponentFixture<DialogComponent>;
    let mockActivatedRoute;
    let mockListService:any;
    let mockStore:any;
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

    beforeEach(waitForAsync(() => {
        mockActivatedRoute = {
            snapshot: {
                paramMap: {
                    get: jasmine.createSpy('get').and.returnValue('1'),
                },
            },
        };
        mockListService = {
            getBookInfo: jasmine.createSpy('getBookInfo').and.returnValue(Promise.resolve(fakeBook)),
        };

        mockStore = {
            select: jasmine.createSpy('select').and.returnValue(of({ favorites: [fakeBook] })),
            dispatch: jasmine.createSpy('dispatch'),
        };
        TestBed.configureTestingModule({
            declarations: [DialogComponent],
            imports: [HttpClientTestingModule, StoreModule.forRoot({})],
            providers: [
              { provide: ActivatedRoute, useValue: mockActivatedRoute },
              { provide: ListService, useValue: mockListService },
              { provide: Store, useValue: mockStore }
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should get book info and set isFav to true if book is already in favorites', async () => {
      await component.ngOnInit();
      expect(mockListService.getBookInfo).toHaveBeenCalledWith('1');
      expect(component.book.name).toEqual('A Game of Thrones');
      expect(component.isFav).toBeTrue();
    });
  
    it('should get book info and set isFav to false if book is not in favorites', async () => {
      mockStore.select.and.returnValue(of({ favorites: [] }));
      await component.ngOnInit();
      expect(mockListService.getBookInfo).toHaveBeenCalledWith('1');
      expect(component.book.name).toEqual('A Game of Thrones');
      expect(component.isFav).toBeFalse();
    });
  
    it('should add book to favorites and set isFav to true', () => {
      component.book = fakeBook;
      component.addToFav();
      expect(mockStore.dispatch).toHaveBeenCalledWith(addToFavorites({ book: fakeBook }));
      expect(component.isFav).toBeTrue();
    });
  
    it('should remove book from favorites and set isFav to false', () => {
      component.book = fakeBook;
      component.removeFromFav();
      expect(mockStore.dispatch).toHaveBeenCalledWith(removeFromFavorites({ book: fakeBook }));
      expect(component.isFav).toBeFalse();
    });
  
    it('should set isFav to true if book is already in favorites', () => {
      component.book = fakeBook;
      component.isBookInFav();
      expect(mockStore.select).toHaveBeenCalledWith('book');
      expect(component.isFav).toBeTrue();
    });
  
    it('should set isFav to false if book is not in favorites', () => {
      mockStore.select.and.returnValue(of({ favorites: [] }));
      component.book = fakeBook;
      component.isBookInFav();
      expect(mockStore.select).toHaveBeenCalledWith('book');
      expect(component.isFav).toBeFalse();
    });
});
