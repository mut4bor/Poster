import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.scss';
import { Routing } from 'pages';
import { Suspense } from 'react';

function App() {
	return (
		<>
			<Suspense fallback={'Loading...'}>
				<header className="header">
					<h1>Picasso Test Project by Molchanov Matvey</h1>
				</header>
				<Routing />
			</Suspense>
		</>
	);
}

// export default withProviders(App);
export default App;
