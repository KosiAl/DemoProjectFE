import { createReducer, on } from '@ngrx/store';
import { Book } from '../Shared/Interfaces/books';
import { addToFavorites, removeFromFavorites } from './actions';

interface AppState {
    favorites: Book[];
}

export const initialState: AppState = {
    favorites: [],
};

export const appReducer = createReducer(
    initialState,
    on(addToFavorites, (state, { book }) => {
        return {
            ...state,
            favorites: [...state.favorites, book],
        };
    }),
    on(removeFromFavorites, (state, { book }) => {
        return {
            ...state,
            favorites: state.favorites.filter((b) => b.name !== book.name),
        };
    })
);
