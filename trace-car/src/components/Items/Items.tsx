import React, { useEffect } from "react";
import {
	AddIcon,
	Container,
	Content,
	ItemH1,
	ItemH3,
	ItemImg,
	ItemWrap,
} from "./styled";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { defaultItemsAsyncState } from "../../states/defaultItemsState";
import { userItemsAsyncState, userItemsRefresher } from "../../states/userItemsState";

const Items = () => {
	const defaultItems = useRecoilValue(defaultItemsAsyncState);
	const userItems = useRecoilValue(userItemsAsyncState);
	const reverseUserItmes = [...userItems].reverse();
	const items = [...reverseUserItmes, ...defaultItems];
	const [refresher, setRefresher] = useRecoilState(userItemsRefresher);
	
	useEffect(() => {
		setRefresher(refresher + 1)
	}, [])
	const itemsData: ItemData[] = !items
		? []
		: items.map((item: EventsResponseItem) => {
			const data = JSON.parse(item.data)
			const txHash = JSON.parse(item.tx.receipt)?.txHash
			return {...data, txHash, eventId: item.eventId}
		});

	let navigate = useNavigate();

	const handleOnClickAdd = () => {
		navigate(`/items/create`);
	};

	const handleOnClickItem = (item: ItemData) => {
		navigate(`/items/${item.eventId}`);
	};

	return (
		<Container>
			<Content>
				<ItemWrap onClick={handleOnClickAdd}>
					<AddIcon />
				</ItemWrap>

				{itemsData.map((item: ItemData, index) => {
					return (
						<ItemWrap key={index} onClick={() => handleOnClickItem(item)}>
							<ItemH1>{item.plateNumber}</ItemH1>
							<ItemH3>{item.model}</ItemH3>
							<ItemH3>{item.year}</ItemH3>
							<ItemImg src={`/assets/images/vehicle${item.image}.png`} />
						</ItemWrap>
					);
				})}
			</Content>
		</Container>
	);
};

export default Items;
