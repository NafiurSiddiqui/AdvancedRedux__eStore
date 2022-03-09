import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../store/ui-slice';
import classes from './CartButton.module.css';

const CartButton = (props) => {
	// put the dipatch in a const
	const dispatch = useDispatch();
	//select the cartQuantity from store
	const cartQuantity = useSelector((state) => state.cart.totalQuantity);
	const toggleCartHandler = () => {
		//run dispatch here.
		//import uiActions and run the method here
		dispatch(uiActions.toggle());
	};
	return (
		<button className={classes.button} onClick={toggleCartHandler}>
			<span>My Cart</span>
			<span className={classes.badge}>{cartQuantity}</span>
		</button>
	);
};

export default CartButton;
