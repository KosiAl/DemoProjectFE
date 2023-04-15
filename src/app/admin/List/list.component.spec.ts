import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ListComponent } from './list.component';
import { appReducer } from '../../Store/reducer';
import { mockData } from '../../MockData/mockBooks';
import { ListService } from '../../Shared/Services/list.service';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { FormsModule } from '@angular/forms';

describe('ListComponent', () => {
    let component: ListComponent;
    let fixture: ComponentFixture<ListComponent>;
    let listService: ListService;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ListComponent],
            imports: [FormsModule, RouterTestingModule, HttpClientTestingModule, StoreModule.forRoot(appReducer)],
            providers: [{ provide: ListService, useValue: mockData }],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ListComponent);
        component = fixture.componentInstance;
        listService = TestBed.inject(ListService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call getBooksAndMakeCopy() and syncSelectedFavorites() in ngOnInit()', async () => {
        spyOn(component, 'getBooksAndMakeCopy');
        spyOn(component, 'syncSelectedFavorites');
        await component.ngOnInit();
        expect(component.getBooksAndMakeCopy).toHaveBeenCalled();
        expect(component.syncSelectedFavorites).toHaveBeenCalled();
    });

    it('should filter books based on the search value in filterTable()', () => {
        component.booksCopy = mockData;
        component.books = [...mockData];

        // Set the search value
        const searchValue = 'A Game of Thrones';

        // Call the filterTable function
        component.filterTable(searchValue);

        // Check if the books array is filtered correctly
        expect(component.books.length).toBe(1);
        expect(component.books[0].name).toBe('A Game of Thrones');
    });

    it('should sort books based on the property and sort state in sortByTableColumn()', () => {
        component.books = mockData;

        // Set the property to sort by
        const property = 'name';

        // Call the sortByTableColumn function (sort state should be 'dec')
        component.sortByTableColumn(property);

        // Check if the books array is sorted in descending order
        expect(component.books[0].name).toBe('The Sworn Sword');
        expect(component.books[1].name).toBe('The Rogue Prince');
        expect(component.books[2].name).toBe('The Princess and the Queen');

        // Call the sortByTableColumn function again (sort state should be 'asc')
        component.sortByTableColumn(property);

        // Check if the books array is sorted in ascending order
        expect(component.books[0].name).toBe('A Clash of Kings');
        expect(component.books[1].name).toBe('A Dance with Dragons');
        expect(component.books[2].name).toBe('A Feast for Crows');

        // Call the sortByTableColumn function again (sort state should be 'def')
        component.sortByTableColumn(property);
    });

    
});
