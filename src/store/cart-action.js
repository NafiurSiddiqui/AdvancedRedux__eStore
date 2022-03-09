import { cartActions } from './cart-slice';
import { uiActions } from './ui-slice';
//fetching data

export const fetchCartData = () => {
	return async (dispatch) => {
		const fetchData = async () => {
			const response = await fetch(
				'https://food-order-b8bcd-default-rtdb.firebaseio.com/cart.json'
			);

			//guard clause
			if (!response.ok) {
				throw new Error('Could not fetch cart data!');
			}

			const data = await response.json();

			return data;
		};

		try {
			const cartData = await fetchData();
			dispatch(
				cartActions.replaceCart({
					items: cartData.items || [],
					totalQuantity: cartData.totalQuantity,
					//👆 must to guard clause undefined, which may return from server in case there is no item. which then in return will throw error.
				})
			);
		} catch (error) {
			dispatch(
				uiActions.showNotification({
					status: 'error',
					title: 'Error!',
					message: 'Fetching Cart Data Failed!',
				})
			);
		}
	};
};

//sending data to firebase
export const sendCartData = (cart) => {
	return async (dispatch) => {
		dispatch(
			uiActions.showNotification({
				status: 'Pending',
				title: 'Sending...',
				message: 'Sending Cart Data',
			})
		);

		//function for sending request

		const sendRequest = async () => {
			const response = await fetch(
				'https://food-order-b8bcd-default-rtdb.firebaseio.com/cart.json',
				{
					method: 'PUT', //overwrite existing data
					body: JSON.stringify(cart),
				}
			);

			//guard clause
			if (!response.ok) {
				throw new Error('Sending Data failed!');
			}
		};

		try {
			await sendRequest();
			//once we get the respnse data
			dispatch(
				uiActions.showNotification({
					status: 'success',
					title: 'success!',
					message: 'Sent Cart Data successfully!',
				})
			);
		} catch (error) {
			dispatch(
				uiActions.showNotification({
					status: 'error',
					title: 'Error!',
					message: 'Sending Cart Data Failed!',
				})
			);
		}
	};
	//returning another function
};

/**
 * while getting the fetched data, we did not have to re-transormed the data. Because, we r using 'PUT' method here, which overrides the existing data and recieve data as we formatted here before sending them.Hence, we get the exactly same formatted data and did not have to format them.
 */
