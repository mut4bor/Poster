import { Routing } from 'pages';
import { withProviders } from './providers';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
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
