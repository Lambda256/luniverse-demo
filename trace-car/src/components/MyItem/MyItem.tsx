import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userItemsAsyncState } from "../../states/userItemsState";
import {
	Container,
	Content,
	ItemH1,
	ItemH3,
	ItemImg,
	ItemWrap,
	Title,
} from "./styled";

const MyItem = () => {
	let navigate = useNavigate();
	const items: EventsResponseItem[] = useRecoilValue(userItemsAsyncState);
	const itemsData: ItemData[] = !items
		? []
		: items.map((item: EventsResponseItem) => JSON.parse(item.data));
	

	const handleOnClickItem = (item: ItemData) => {
		navigate(`/items/${item.id}`);
	};

	return (
		<>
			<Container>
				{/* <Title>My Page</Title> */}
				<Content>
					{itemsData.map((item, index) => (
						<ItemWrap key={index} onClick={() => handleOnClickItem(item)}>
							<ItemH1>{item.plateNumber}</ItemH1>
							<ItemH3>{item.model}</ItemH3>
							<ItemH3>{item.year}</ItemH3>
							<ItemImg src={`/assets/images/vehicle${item.image}.png`} />
						</ItemWrap>
					))}
				</Content>
			</Container>
		</>
	);
};

export default MyItem;
