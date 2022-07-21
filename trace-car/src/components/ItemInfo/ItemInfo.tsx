import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { historyAsyncState } from "../../states/itemHistoryState";
import { selectedItemAsyncState, selectedItemsRefresher } from "../../states/selectedItemState";
import {
	Btn,
	BtnWrap,
	Container,
	ContentWrap,
	IMG,
	ImgWrap,
	Span,
	Label,
	ContentBox,
	Title,
	InfoWrap,
	TimeLine,
} from "./styled";

const ItemInfo = () => {
	const { eventId } = useParams();
	const selectedItem = useRecoilValue(selectedItemAsyncState({ eventId }));
	const itemsHistory = useRecoilValue(historyAsyncState(selectedItem.id));
	const [itemData, setItemData] = useState(selectedItem);
	const [refresher, setRefresher] = useRecoilState(selectedItemsRefresher)

	useEffect(() => {
		setRefresher(refresher + 1)
	}, [])

	useEffect(() => {
		if(itemsHistory.length > 0) setItemData(JSON.parse(itemsHistory[itemsHistory.length-1].data) as ItemData)
	}, [itemsHistory])

	return (
		<Container>
			<InfoWrap>
				<Title> Item Info </Title>
				<ImgWrap>
					<IMG src={`/assets/images/vehicle${itemData.image}.png`} />
				</ImgWrap>
				<ContentWrap>
					<ContentBox>
						<Label htmlFor="owner">Owner</Label>
						<Span id="owner" textTransform="uppercase">
							{itemData.owner}
						</Span>
					</ContentBox>
					{/* Span1 end */}
					<ContentBox>
						<Label htmlFor="plate">Plate Number</Label>
						<Span id="plate" textTransform="uppercase">
							{itemData.plateNumber}
						</Span>
					</ContentBox>
					{/* Span2 end */}
					<ContentBox>
						<Label htmlFor="model">Model</Label>
						<Span id="model" textTransform="uppercase">
							{itemData.model}
						</Span>
					</ContentBox>
					{/* Span3 end */}
					<ContentBox>
						<Label htmlFor="year">Year</Label>
						<Span id="year">{itemData.year}</Span>
					</ContentBox>
					{/* Span4 end */}
					<ContentBox>
						<Label htmlFor="mileage">Mileage (km)</Label>
						<Span id="mileage">{itemData.mileage}</Span>
					</ContentBox>
					{/* Span5 end */}
					<ContentBox>
						<Label htmlFor="id">VIN</Label>
						<Span id="id" textTransform="uppercase">
							{itemData.id}
						</Span>
					</ContentBox>
					{/* Span6 end */}
					<ContentBox>
						<Label htmlFor="description">Description</Label>
						<Span id="description">{itemData.description}</Span>
					</ContentBox>
					{/* Span7 end */}
				</ContentWrap>
				<BtnWrap>
					<Btn to={`/items/${eventId}/update`} state={itemData}>
						Update
					</Btn>
				</BtnWrap>
			</InfoWrap>
			<TimeLine />
		</Container>
	);
};

export default ItemInfo;
