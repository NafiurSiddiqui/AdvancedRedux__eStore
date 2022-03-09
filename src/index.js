import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import store from './store';
import App from './App';

ReactDOM.render(
	//provid the stroe app wide
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
