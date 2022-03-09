import { createSlice } from '@reduxjs/toolkit';

// const cartSlice = createSlice({
// 	name: 'cart',
// 	initialState: {
// 		//itemHolder
// 		items: [],
// 		//itemQuantity
// 		totalQuantity: 0,
// 	},
// 	reducers: {
// 		//add item
// 		addItemToCart(state, action) {
// 			//get the payload from the action
// 			const newItem = action.payload;
// 			//check for the matched item
// 			const existingItem = state.items.find((item) => item.id === newItem.id);
// 			//increase item quantity
// 			state.totalQuantity++;
// 			//if item does not exist
// 			if (!existingItem) {
// 				//push the item
// 				state.items.push({
// 					id: newItem.id,
// 					price: newItem.price,
// 					quantity: 1,
// 					totalPrice: newItem.price,
// 					name: newItem.title,
// 				});
// 			} else {
// 				//item exist
// 				existingItem.quantity++;
// 				existingItem.totalPrice = existingItem.totalPrice + newItem.price;
// 			}
// 		},
// 		//remove item
// 		removeItemFromCart(state, action) {
// 			//get the id
// 			const id = action.payload;
// 			//check for the item to remove
// 			const existingItem = state.items.find((item) => item.id === id);
// 			//reduce item quantity
// 			state.totalQuantity--;

// 			//conditions
// 			if (existingItem.quantity === 1) {
// 				//if the quantity is 1
// 				state.items = state.items.filter((item) => item.id !== id);
// 				//this returns a new array without this item.
// 			} else {
// 				//reduce quantity
// 				existingItem.quantity--;
// 				//reduce price
// 				// existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
// 			}
// 		},
// 	},
// });

// //export the slice
// export default cartSlice;
// //export the actions
// export const cartActions = cartSlice.actions;

/**
 * @push - this straight mutates the original state which is NOT TO DO but since we are using redux toolkit we can do it. Necessary transformation, cloning are done behind the scene for us.
 * @object - {totalPrice should have been quantity * price but since quantity is 1, it is just the price}
 * ** all of these field name of the object are upto us. Just make sure to reference them where it is used.
 */

//--------------------------------------------------------------------------------------------------------------stage (Backend - component ways)

// const cartSlice = createSlice({
// 	name: 'cart',
// 	initialState: {
// 		//itemHolder
// 		items: [],
// 		//itemQuantity
// 		totalQuantity: 0,
// 	},
// 	reducers: {
// 		//replace cart - without mutating original state
// 		replaceCart(state, action) {
// 			state.totalQuantity = action.payload.totalQuantity;
// 			state.items = action.payload.items;
// 		},
// 		//add item
// 		addItemToCart(state, action) {
// 			//get the payload from the action
// 			const newItem = action.payload;
// 			//check for the matched item
// 			const existingItem = state.items.find((item) => item.id === newItem.id);
// 			//increase item quantity
// 			state.totalQuantity++;
// 			//if item does not exist
// 			if (!existingItem) {
// 				//push the item
// 				state.items.push({
// 					id: newItem.id,
// 					price: newItem.price,
// 					quantity: 1,
// 					totalPrice: newItem.price,
// 					name: newItem.title,
// 				});
// 			} else {
// 				//item exist
// 				existingItem.quantity++;
// 				existingItem.totalPrice = existingItem.totalPrice + newItem.price;
// 			}
// 		},
// 		//remove item
// 		removeItemFromCart(state, action) {
// 			//get the id
// 			const id = action.payload;
// 			//check for the item to remove
// 			const existingItem = state.items.find((item) => item.id === id);
// 			//reduce item quantity
// 			state.totalQuantity--;

// 			//conditions
// 			if (existingItem.quantity === 1) {
// 				//if the quantity is 1
// 				state.items = state.items.filter((item) => item.id !== id);
// 				//this returns a new array without this item.
// 			} else {
// 				//reduce quantity
// 				existingItem.quantity--;
// 				//reduce price
// 				// existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
// 			}
// 		},
// 	},
// });

// //export the slice
// export default cartSlice;
// //export the actions
// export const cartActions = cartSlice.actions;

//--------------------------------------------------------------------------------------------------------------stage ( with ACTION creator)

const cartSlice = createSlice({
	name: 'cart',
	initialState: {
		//itemHolder
		items: [],
		//itemQuantity
		totalQuantity: 0,
		changed: false,
	},
	reducers: {
		//replace cart - without mutating original state
		replaceCart(state, action) {
			state.totalQuantity = action.payload.totalQuantity;
			state.items = action.payload.items;
		},
		//add item
		addItemToCart(state, action) {
			//get the payload from the action
			const newItem = action.payload;
			//check for the matched item
			const existingItem = state.items.find((item) => item.id === newItem.id);
			//increase item quantity
			state.totalQuantity++;
			//state changed obviously
			state.changed = true;
			//if item does not exist
			if (!existingItem) {
				//push the item
				state.items.push({
					id: newItem.id,
					price: newItem.price,
					quantity: 1,
					totalPrice: newItem.price,
					name: newItem.title,
				});
			} else {
				//item exist
				existingItem.quantity++;
				existingItem.totalPrice = existingItem.totalPrice + newItem.price;
			}
		},
		//remove item
		removeItemFromCart(state, action) {
			//get the id
			const id = action.payload;
			//check for the item to remove
			const existingItem = state.items.find((item) => item.id === id);
			//reduce item quantity
			state.totalQuantity--;
			//state changed obviously
			state.changed = true;
			//conditions
			if (existingItem.quantity === 1) {
				//if the quantity is 1
				state.items = state.items.filter((item) => item.id !== id);
				//this returns a new array without this item.
			} else {
				//reduce quantity
				existingItem.quantity--;
				//reduce price
				existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
			}
		},
	},
});

//action creator
//we put the creator to action creator component - cart-action.

//export the slice
export default cartSlice;
//export the actions
export const cartActions = cartSlice.actions;

/**
 * @actionCreator -
 * ** returns a new function which returns the action object.
 * ** Must create outside of the function.
 * upuntil now we never implicitly created the object the way did inside action creator here because redux toolkit did this behind the scene for us for all those reducer method we created up there.
 *
 * @changed -
 * this state data is there to keep track of the cartChanging behaviour
 */
