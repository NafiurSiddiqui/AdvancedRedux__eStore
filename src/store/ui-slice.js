import { createSlice } from '@reduxjs/toolkit';

//create the slice
// const uiSlice = createSlice({
// 	name: 'ui',
// 	initialState: {
// 		cartIsVisible: false,
// 	},
// 	reducers: {
// 		//toggle cart
// 		toggle(state) {
// 			state.cartIsVisible = !state.cartIsVisible;
// 		},
// 	},
// });

// //export the slice
// export default uiSlice;
// //export the actions
// export const uiActions = uiSlice.actions;

//--------------------------------------------------------------------------------------------------------------stage ( with HTTP req)

//create the slice
const uiSlice = createSlice({
	name: 'ui',
	initialState: {
		cartIsVisible: false,
		Notification: null,
	},
	reducers: {
		//toggle cart
		toggle(state) {
			state.cartIsVisible = !state.cartIsVisible;
		},
		showNotification(state, action) {
			state.notification = {
				status: action.payload.status,
				title: action.payload.title,
				message: action.payload.message,
			};
		},
	},
});

//export the slice
export default uiSlice;
//export the actions
export const uiActions = uiSlice.actions;

/**
 * @notification -
 * ** added state for handling notification state
 *
 * @showNotifiaction -
 * we define the notfication payload here, and we set the necessary writable message anywhere this action is used. In our case, inside app componenet, dispatch(uiAction.showNotification({..writable data}))
 */
