import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
	useRecoilState,
	useRecoilValue,
	useResetRecoilState,
	useSetRecoilState,
} from "recoil";
import {
	historyAsyncState,
	historyRefresher,
} from "../../states/itemHistoryState";
import { selectedItemAsyncState } from "../../states/selectedItemState";
import {
	addUserItemAsyncState,
	addUserItemDataState,
} from "../../states/userItemsState";
import Config from "../../utils/config";
import {
	Btn,
	BtnWrap,
	Container,
	Form,
	FormWrap,
	IMG,
	ImgWrap,
	Input,
	InputLabel,
	InputBox,
	Title,
} from "./styled";

const UpdateForm = () => {
	const { eventId } = useParams();
	const selectedItem = useRecoilValue(selectedItemAsyncState({ eventId }));
	const itemsHistory = useRecoilValue(historyAsyncState(selectedItem.id));
	const recentItemData = JSON.parse(itemsHistory[itemsHistory.length - 1].data)
	const [itemData, setItemData] = useState(recentItemData || selectedItem);
	const navigate = useNavigate();
	const setAddUserItemData = useSetRecoilState(addUserItemDataState);
	const resetAddUserItemData = useResetRecoilState(addUserItemDataState);
	const [inputData, setInputData] = useState({
		id: itemData.id,
		image: itemData.image,
		owner: Config.USER_NAME,
		plateNumber: itemData.plateNumber,
		model: itemData.model,
		year: 2022,
		mileage: itemData.mileage,
		description: itemData.description,
	});
	useRecoilValue(addUserItemAsyncState);
	useRecoilValue(historyAsyncState(eventId));
	const [refresher, setRefresher] = useRecoilState(historyRefresher); // Refreshing user items

	useEffect(() => {
		return () => {
			resetAddUserItemData();
		};
	}, []);

	const submitData = () => {
		const inputForm: HTMLFormElement | null =
			document.querySelector("#input-form");

		// Check if required fields are filled out
		if (inputForm === null) return;
		if (!inputForm.checkValidity()) {
			inputForm.reportValidity();
			return;
		}
		setAddUserItemData(inputData as ItemData);
		setRefresher(refresher + 1);
		navigate(`/items/${eventId}`, { replace: true });
	};

	const handleOnClickSubmit = (e: React.MouseEvent) => {
		e.preventDefault();
		submitData();
	};

	// Set 'enter' to submit
	const handleOnEnter: React.KeyboardEventHandler<HTMLFormElement> = (e) => {
		if (e.key === "Enter") {
			submitData();
		}
	};

	const handleOwnerOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputData({
			...inputData,
			owner: e.target.value || e.target.defaultValue,
		});
	};

	const handlePlateOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputData({
			...inputData,
			plateNumber: e.target.value || e.target.defaultValue,
		});
	};

	const handleModelOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputData({
			...inputData,
			model: e.target.value || e.target.defaultValue,
		});
	};

	const handleYearOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputData({
			...inputData,
			year: Number(e.target.value) || Number(e.target.defaultValue),
		});
	};

	const handleMileageOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputData({
			...inputData,
			mileage: Number(e.target.value) || Number(e.target.defaultValue),
		});
	};

	const handleDescriptionOnChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setInputData({
			...inputData,
			description: e.target.value || e.target.defaultValue,
		});
	};

	return (
		<Container>
			<FormWrap>
				<Title>Add more informations</Title>
				<ImgWrap>
					<IMG src={`/assets/images/vehicle${itemData.image}.png`} />
				</ImgWrap>
				<Form id="input-form" onKeyDown={handleOnEnter}>
					<InputBox>
						<InputLabel htmlFor="owner" required>
							Owner
						</InputLabel>
						<Input
							id="owner"
							required
							textTransform="uppercase"
							defaultValue={Config.USER_NAME}
							onChange={handleOwnerOnChange}
						/>
					</InputBox>
					{/* Input1 end */}
					<InputBox>
						<InputLabel htmlFor="plate" required={true}>
							Plate Number
						</InputLabel>
						<Input
							id="plate"
							required
							textTransform="uppercase"
							defaultValue={itemData.plateNumber}
							onChange={handlePlateOnChange}
						/>
					</InputBox>
					{/* Input2 end */}
					<InputBox>
						<InputLabel htmlFor="model">Model</InputLabel>
						<Input
							id="model"
							required
							textTransform="uppercase"
							readOnly={true}
							defaultValue={itemData.model}
							onChange={handleModelOnChange}
						/>
					</InputBox>
					{/* Input3 end */}
					<InputBox>
						<InputLabel htmlFor="year">Year</InputLabel>
						<Input
							id="year"
							type="number"
							min="1900"
							max="2099"
							step="1"
							required
							readOnly={true}
							defaultValue={itemData.year}
							onChange={handleYearOnChange}
						/>
					</InputBox>
					{/* Input4 end */}
					<InputBox>
						<InputLabel htmlFor="mileage" required={true}>
							Mileage (km)
						</InputLabel>
						<Input
							id="mileage"
							type="number"
							min={itemData.mileage}
							required
							defaultValue={itemData.mileage}
							onChange={handleMileageOnChange}
						/>
					</InputBox>
					{/* Input5 end */}
					<InputBox>
						<InputLabel htmlFor="id">VIN</InputLabel>
						<Input
							id="id"
							type="text"
							readOnly
							textTransform="uppercase"
							value={itemData.id}
						/>
					</InputBox>
					{/* Input6 end */}
					<InputBox>
						<InputLabel htmlFor="description">Description</InputLabel>
						<Input
							id="description"
							type="text"
							defaultValue={itemData.description}
							onChange={handleDescriptionOnChange}
						/>
					</InputBox>
					{/* Input7 end */}
				</Form>
				<BtnWrap>
					<Btn to="" onClick={handleOnClickSubmit}>
						Submit
					</Btn>
				</BtnWrap>
			</FormWrap>
		</Container>
	);
};

export default UpdateForm;
