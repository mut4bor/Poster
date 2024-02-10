import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

export const withRouter = (component: () => React.ReactNode) => () =>
	<Suspense fallback={'Loading...'}>{component()}</Suspense>;
