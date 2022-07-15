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
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { defaultItemsAsyncState } from "../../states/defaultItemsState";
import { userItemsAsyncState, userItemsRefresher } from "../../states/userItemsState";
import { selectedItemState } from "../../states/selectedItemState";

const Items = () => {
	const defaultItems = useRecoilValue(defaultItemsAsyncState);
	const userItems = useRecoilValue(userItemsAsyncState);
	const reverseUserItmes = [...userItems].reverse();
	const items = [...reverseUserItmes, ...defaultItems];
	const setSelectedItem = useSetRecoilState(selectedItemState);
	const [refresher, setRefresher] = useRecoilState(userItemsRefresher);

	useEffect(() => {
		setRefresher(refresher + 1)
	}, [])

	const itemsData = items
		.map((item) => {
			try {
				const data = JSON.parse(item.data);
				return data;
			} catch (error) {
				return false;
			}
		})
		.filter((data) => data !== false);

	let navigate = useNavigate();

	const handleOnClickAdd = () => {
		navigate(`/items/create`);
	};

	const handleOnClickItem = (item: ItemData) => {
		setSelectedItem(item);
		navigate(`/items/${item.id}`);
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
							<ItemImg src={`/src/images/vehicle${item.image}.png`} />
						</ItemWrap>
					);
				})}
			</Content>
		</Container>
	);
};

export default Items;
