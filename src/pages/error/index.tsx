import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
	const error = useRouteError() as any;
	console.error(error);

	return (
		<div
			id="error-page"
			style={{
				display: 'flex',
				flexDirection: 'column',
				gap: '20px',
				alignItems: 'center',
				justifyContent: 'center',
				height: '100vh'
			}}
		>
			<h1>Oops!</h1>
			<p>Sorry, an unexpected error has occurred.</p>
			<p>
				<i>{error.statusText || error.message}</i>
			</p>
		</div>
	);
}
