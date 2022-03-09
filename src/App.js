import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { fetchCartData } from './store/cart-action';
import { sendCartData } from './store/cart-action';
import { uiActions } from './store/ui-slice';

// function App() {
// 	//select the store item
// 	const showCart = useSelector((state) => state.ui.cartIsVisible);
// 	return (
// 		<Layout>
// 			{showCart && <Cart />}
// 			<Products />
// 		</Layout>
// 	);
// }

// export default App;

/**
 * @useSelctor - automatically gives us the store object. we drill into it and look for ui and its certain value;
 */

//--------------------------------------------------------------------------------------------------------------stage ( handling HTTP)

// //to not to send HTTP right away
// let isInitial = true;

// //sending cart data

// function App() {
// 	//select the store item
// 	const showCart = useSelector((state) => state.ui.cartIsVisible);
// 	const notification = useSelector((state) => state.ui.notification);
// 	//dispatch
// 	const dispatch = useDispatch();

// 	//anytime the cart changes, we send the  HTTP req
// 	const cart = useSelector((state) => state.cart);

// 	useEffect(() => {
// 		const sendCartData = async () => {
// 			//notificiations for status
// 			dispatch(
// 				uiActions.showNotification({
// 					status: 'Pending',
// 					title: 'Sending...',
// 					message: 'Sending Cart Data',
// 				})
// 			);
// 			const response = await fetch(
// 				'https://food-order-b8bcd-default-rtdb.firebaseio.com/cart.json',
// 				{
// 					method: 'PUT', //overwrite existing data
// 					body: JSON.stringify(cart),
// 				}
// 			);

// 			//guard clause
// 			if (!response.ok) {
// 				throw new Error('Sending Data failed!');
// 			}
// 			//we are just sending the data and not expecting any response coming in that we would transform here.Therefore, we did not need the response.json() data.

// 			//once we get the respnse data
// 			dispatch(
// 				uiActions.showNotification({
// 					status: 'success',
// 					title: 'success!',
// 					message: 'Sent Cart Data successfully!',
// 				})
// 			);
// 		};
// 		//check initial
// 		if (isInitial) {
// 			isInitial = false;
// 			//so that the block does not happen again and prevented the send.. function from being exectured on the first render.
// 			return;
// 			//in this case, we will not send our cart data from below function.
// 		}

// 		sendCartData().catch((error) => {
// 			dispatch(
// 				uiActions.showNotification({
// 					status: 'error',
// 					title: 'Error!',
// 					message: 'Sending Cart Data Failed!',
// 				})
// 			);
// 		});
// 	}, [cart, dispatch]);
// 	return (
// 		<Fragment>
// 			{notification && (
// 				<Notification
// 					status={notification.status}
// 					title={notification.title}
// 					message={notification.message}
// 				/>
// 			)}
// 			<Layout>
// 				{showCart && <Cart />}
// 				<Products />
// 			</Layout>
// 		</Fragment>
// 	);
// }

// export default App;

//--------------------------------------------------------------------------------------------------------------stage ( with ACTION CREATOR)

//to not to send HTTP right away
let isInitial = true;

//sending cart data

function App() {
	//select the store item
	const showCart = useSelector((state) => state.ui.cartIsVisible);
	const notification = useSelector((state) => state.ui.notification);
	//dispatch
	const dispatch = useDispatch();

	//anytime the cart changes, we send the  HTTP req
	const cart = useSelector((state) => state.cart);

	//effect for fetching data
	useEffect(() => {
		dispatch(fetchCartData());
	}, [dispatch]);

	useEffect(() => {
		//initial conditional check
		if (isInitial) {
			//flip the init
			isInitial = false;
			//return out
			return;
		}

		//here we check for the cart changing behaviour
		if (cart.changed) {
			//this prevent the application from sending data upon first render
			dispatch(sendCartData(cart));
		}
	}, [cart, dispatch]);
	return (
		<Fragment>
			{notification && (
				<Notification
					status={notification.status}
					title={notification.title}
					message={notification.message}
				/>
			)}
			<Layout>
				{showCart && <Cart />}
				<Products />
			</Layout>
		</Fragment>
	);
}

export default App;
