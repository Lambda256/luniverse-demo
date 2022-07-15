import React from "react";
import AsyncBoundary from "../components/AsyncBoundary/AsyncBoundary";
import Error from "../components/Error";
import UpdateForm from "../components/UpdateForm";

const Update = () => {
	return (
		<>
			<AsyncBoundary
				ErrorFallback={(arg) => <Error error={arg.error} />}
				SuspenseFallback={<h1>Loading...</h1>}
			>
				<UpdateForm />
			</AsyncBoundary>
		</>
	);
};

export default Update;
