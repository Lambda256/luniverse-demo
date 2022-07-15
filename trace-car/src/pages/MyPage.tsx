import React from "react";
import AsyncBoundary from "../components/AsyncBoundary/AsyncBoundary";
import Error from "../components/Error";
import MyItem from "../components/MyItem";

const MyPage = () => {
	return (
		<>
			<AsyncBoundary
				ErrorFallback={(arg) => <Error error={arg.error} />}
				SuspenseFallback={<h1>Loading...</h1>}
			>
				<MyItem />
			</AsyncBoundary>
		</>
	);
};

export default MyPage;
