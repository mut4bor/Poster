import { Routing } from 'pages';
import { withProviders } from './providers';
import './index.scss';

const App = () => {
	return (
		<>
			<header className="header">
				<h1>Picasso Test Project by Molchanov Matvey</h1>
			</header>
			<Routing />
		</>
	);
};

export default withProviders(App);
