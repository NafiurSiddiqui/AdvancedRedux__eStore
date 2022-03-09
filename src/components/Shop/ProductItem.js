import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart-slice';
import Card from '../UI/Card';
import classes from './ProductItem.module.css';

// const ProductItem = (props) => {
// 	//dispatch
// 	const dispatch = useDispatch();

// 	const { title, price, description, id } = props;

// 	const addToCartHandler = () => {
// 		dispatch(
// 			cartActions.addItemToCart({
// 				id,
// 				title,
// 				price,
// 			})
// 		);
// 	};
// 	return (
// 		<li className={classes.item}>
// 			<Card>
// 				<header>
// 					<h3>{title}</h3>
// 					<div className={classes.price}>${price.toFixed(2)}</div>
// 				</header>
// 				<p>{description}</p>
// 				<div className={classes.actions}>
// 					<button onClick={addToCartHandler}>Add to Cart</button>
// 				</div>
// 			</Card>
// 		</li>
// 	);
// };

// export default ProductItem;

/**
 * @dispatch -
 * **imported cartActions
 * **passed the necessary attribute fields like id, title etc. since we set our 'addItemToCart'from cartSlice with a payload.
 * all the necessary attribute fields we have drawn out of the props up there {id, title..}=props
 */

//--------------------------------------------------------------------------------------------------------------stage ( Talking to the backend - component ways)

// import { useSelector } from 'react-redux';

// const ProductItem = (props) => {
// 	const cart = useSelector((state) => state.cart);
// 	const dispatch = useDispatch();

// 	const { title, price, description, id } = props;

// 	const addToCartHandler = () => {
// 		const newTotalQuantity = cart.totalQuantity + 1;

// 		const updatedItems = cart.items.slice(); // create copy via slice to avoid mutating original state
// 		const existingItem = updatedItems.find((item) => item.id === id);
// 		if (existingItem) {
// 			const updatedItem = { ...existingItem }; // new object + copy existing properties to avoid state mutation
// 			updatedItem.quantity++;
// 			updatedItem.totalPrice = updatedItem.totalPrice + price;
// 			const existingItemIndex = updatedItems.findIndex((item) => item.id === id);
// 			updatedItems[existingItemIndex] = updatedItem;
// 		} else {
// 			updatedItems.push({
// 				id: id,
// 				price: price,
// 				quantity: 1,
// 				totalPrice: price,
// 				name: title,
// 			});
// 		}

// 		const newCart = {
// 			totalQuantity: newTotalQuantity,
// 			items: updatedItems,
// 		};

// 		dispatch(cartActions.replaceCart(newCart));

// 		// and then send Http request
// 		// fetch('firebase-url', { method: 'POST', body: JSON.stringify(newCart) })

// 		// dispatch(
// 		//   cartActions.addItemToCart({
// 		//     id,
// 		//     title,
// 		//     price,
// 		//   })
// 		// );
// 	};

// 	return (
// 		<li className={classes.item}>
// 			<Card>
// 				<header>
// 					<h3>{title}</h3>
// 					<div className={classes.price}>${price.toFixed(2)}</div>
// 				</header>
// 				<p>{description}</p>
// 				<div className={classes.actions}>
// 					<button onClick={addToCartHandler}>Add to Cart</button>
// 				</div>
// 			</Card>
// 		</li>
// 	);
// };

// export default ProductItem;

/**
 * Here we do the transformation for the product item, WITHOUT mutating the state now.
 * this was just the componet ways of transforming the data before sending to the backend
 */

//--------------------------------------------------------------------------------------------------------------stage ( useEffect)

const ProductItem = (props) => {
	const dispatch = useDispatch();

	const { title, price, description, id } = props;

	const addToCartHandler = () => {
		// and then send Http request
		// fetch('firebase-url', { method: 'POST', body: JSON.stringify(newCart) })

		dispatch(
			cartActions.addItemToCart({
				id,
				title,
				price,
			})
		);
	};

	return (
		<li className={classes.item}>
			<Card>
				<header>
					<h3>{title}</h3>
					<div className={classes.price}>${price.toFixed(2)}</div>
				</header>
				<p>{description}</p>
				<div className={classes.actions}>
					<button onClick={addToCartHandler}>Add to Cart</button>
				</div>
			</Card>
		</li>
	);
};

export default ProductItem;
