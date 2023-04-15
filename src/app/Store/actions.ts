import { createAction, props } from '@ngrx/store';
import { Book } from '../Shared/Interfaces/books';

export const addToFavorites = createAction('[Book] Add to Favorites', props<{ book: Book }>());
export const removeFromFavorites = createAction('[Book] Remove from Favorites', props<{ book: Book }>());