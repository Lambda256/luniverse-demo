import React, { useEffect } from "react";
import AsyncBoundary from "../components/AsyncBoundary/AsyncBoundary";
import AuthTokenForm from "../components/AuthTokenForm";
import Error from "../components/Error";

const AuthToken = () => {
	return (
		<>
			<AsyncBoundary
				ErrorFallback={(arg) => <Error error={arg.error} />}
				SuspenseFallback={<h1>Loading...</h1>}
			>
				<AuthTokenForm />
			</AsyncBoundary>
		</>
	);
};

export default AuthToken;
