import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { historyAsyncState } from "../../states/itemHistoryState";
import { selectedItemAsyncState } from "../../states/selectedItemState";
import {
	Box,
	Card,
	CardContent,
	Cards,
	Container,
	Description,
	H1,
	CreatedIcon,
	CreatedText,
	Time,
	CreatedCard,
	ScanLink,
} from "./styled";

const History = () => {
	const { eventId } = useParams();
	const selectedItem = useRecoilValue(selectedItemAsyncState({eventId}));
	const historyData: EventsResponseItem[] = useRecoilValue(historyAsyncState(selectedItem.id));
	const reorderHistoryData = [...historyData].reverse();

	useEffect(() => {
		const contents = document.querySelectorAll(".content");
		const isElementShown = (el: Element) => {
			let rect = el.getBoundingClientRect();
			return rect.bottom <= window.innerHeight;
		};

		contents.forEach((content: Element) => {
			window.addEventListener("scroll", () => {
				if (isElementShown(content)) content.classList.add("show");
				else content.classList.remove("show");
			});
		});
	}, [historyData]);

	const formattingTime = (seconds: number) => {
		let isoTime = new Date(seconds * 1000).toISOString();
		let yyyymmss = isoTime.slice(0, 10);
		let hh = (Number(isoTime.slice(11, 13)) + 9) % 24;
		let mmss = isoTime.slice(14, 19);
		return `${yyyymmss} ${hh}:${mmss}`;
	};

	return (
		<Container>
			<Cards>
				{reorderHistoryData.map((item, index) => {
					const itemData: ItemData = JSON.parse(item.data);
					let txHash =""
					if(item.tx.status === "EXECUTED") txHash = JSON.parse(item.tx.receipt).txHash;

					return (
						<Card key={index}>
							<Time>{formattingTime(item.timestamp)}</Time>
							<CardContent className="content">
								<Box>
									<H1>Owner</H1>
									<Description>{itemData.owner}</Description>
								</Box>
								<Box>
									<H1>PlateNumber</H1>
									<Description>{itemData.plateNumber}</Description>
								</Box>
								<Box>
									<H1>Mileage</H1>
									<Description>{itemData.mileage}</Description>
								</Box>
								<Box>
									<H1>Description</H1>
									<Description>{itemData.description}</Description>
								</Box>
								<ScanLink
									href={`https://sidescan.luniverse.io/chains/2251976252273339850/transactions/${txHash}`}
									target="_blank"
								>
									Scan Link
								</ScanLink>
							</CardContent>
						</Card>
					);
				})}
			</Cards>

			<CreatedIcon>
				<CreatedText>
					<H1>Created</H1>
				</CreatedText>
			</CreatedIcon>
			<CreatedCard className="content">
				<Box>
					<H1>Owner</H1>
					<Description>{selectedItem.owner}</Description>
				</Box>
				<Box>
					<H1>Plate Number</H1>
					<Description>{selectedItem.plateNumber}</Description>
				</Box>
				<Box>
					<H1>Model</H1>
					<Description>{selectedItem.model}</Description>
				</Box>
				<Box>
					<H1>Year</H1>
					<Description>{selectedItem.year}</Description>
				</Box>
				<Box>
					<H1>Mileage</H1>
					<Description>{selectedItem.mileage}</Description>
				</Box>
				<Box>
					<H1>VIN</H1>
					<Description>{selectedItem.id}</Description>
				</Box>
				<Box>
					<H1>Description</H1>
					<Description>{selectedItem.description}</Description>
				</Box>
				<ScanLink
					href={`https://sidescan.luniverse.io/chains/2251976252273339850/transactions/${selectedItem.txHash}`}
					target="_blank"
				>
					Scan Link
				</ScanLink>
			</CreatedCard>
		</Container>
	);
};

export default History;
