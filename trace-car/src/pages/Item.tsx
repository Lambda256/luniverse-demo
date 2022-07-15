import React from "react";
import AsyncBoundary from "../components/AsyncBoundary/AsyncBoundary";
import Error from "../components/Error";
import History from "../components/History";
import ItemInfo from "../components/ItemInfo";

const Item = () => {
	return (
		<>
			<AsyncBoundary
				ErrorFallback={(arg) => <Error error={arg.error} />}
				SuspenseFallback={<h1>Loading...</h1>}
			>
				<ItemInfo />
				<History />
			</AsyncBoundary>
		</>
	);
};

export default Item;
