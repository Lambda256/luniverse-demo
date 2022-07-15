import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { historyAsyncState } from "../../states/itemHistoryState";
import { selectedItemState } from "../../states/selectedItemState";
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
	const itemsHistroy = useRecoilValue(historyAsyncState);
	const selectedItem = useRecoilValue(selectedItemState);
	const [itemData, setItemData] = useState(selectedItem);
	
	useEffect(() => {
		if(itemsHistroy.length > 0) setItemData(JSON.parse(itemsHistroy[itemsHistroy.length-1].data) as ItemData)
	}, [itemsHistroy])
	
	return (
		<Container>
			<InfoWrap>
				<Title> Item Info </Title>
				<ImgWrap>
					<IMG src={`/src/images/vehicle${itemData.image}.png`} />
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
						<Span id="id" textTransform="uppercase">{itemData.id}</Span>
					</ContentBox>
					{/* Span6 end */}
					<ContentBox>
						<Label htmlFor="description">Description</Label>
						<Span id="description">{itemData.description}</Span>
					</ContentBox>
					{/* Span7 end */}
				</ContentWrap>
				<BtnWrap>
					<Btn to={`/items/${itemData.id}/update`} state={itemData}>
						Update
					</Btn>
				</BtnWrap>
			</InfoWrap>
			<TimeLine />
		</Container>
	);
};

export default ItemInfo;