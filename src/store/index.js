import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './cart-slice';

import uiSlice from './ui-slice';

const store = configureStore({
	reducer: {
		ui: uiSlice.reducer,
		cart: cartSlice.reducer,
	},
});

export default store;

/**
 * @uiSLice - make sure to delcare here as singular form not pluaral while accessing the store reducer. (e.g - 'uiSlice.reducer' not 'reducers')
 */
