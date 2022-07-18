import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import { selectedItemState } from "../../states/selectedItemState";
import {
	addUserItemAsyncState,
	addUserItemDataState,
} from "../../states/userItemsState";
import Config from "../../ts/config";
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
	const selectedItem = useRecoilValue(selectedItemState);
	const navigate = useNavigate();
	const setItemData = useSetRecoilState(addUserItemDataState);
	const resetItemData = useResetRecoilState(addUserItemDataState);
	const [inputData, setInputData] = useState({
		id: selectedItem.id,
		image: selectedItem.image,
		owner: Config.USER_NAME,
		plateNumber: selectedItem.plateNumber,
		model: selectedItem.model,
		year: 2022,
		mileage: selectedItem.mileage,
		description: "",
	});
	useRecoilValue(addUserItemAsyncState);
	useRecoilValue(historyAsyncState);
	const [refresher, setRefresher] = useRecoilState(historyRefresher); // Refreshing user items

	useEffect(() => {
		return () => {
			resetItemData();
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
		setItemData(inputData as ItemData);
		setRefresher(refresher + 1);
		navigate("../", { replace: true });
	}

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
					<IMG src={`/assets/images/vehicle${selectedItem.image}.png`} />
				</ImgWrap>
				<Form id="input-form" onKeyDown={handleOnEnter}>
					<InputBox>
						<InputLabel htmlFor="owner" required>Owner</InputLabel>
						<Input
							id="owner"
							required
							placeholder="William"
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
							placeholder="NY737ZN"
							textTransform="uppercase"
							defaultValue={selectedItem.plateNumber}
							onChange={handlePlateOnChange}
						/>
					</InputBox>
					{/* Input2 end */}
					<InputBox>
						<InputLabel htmlFor="model">Model</InputLabel>
						<Input
							id="model"
							required
							placeholder="Aslan"
							textTransform="uppercase"
							readOnly={true}
							defaultValue={selectedItem.model}
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
							placeholder={`${new Date().getFullYear()}`}
							readOnly={true}
							defaultValue={selectedItem.year}
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
							min={0}
							required
							placeholder="0"
							defaultValue={selectedItem.mileage}
							onChange={handleMileageOnChange}
						/>
					</InputBox>
					{/* Input5 end */}
					<InputBox>
						<InputLabel htmlFor="id">VIN</InputLabel>
						<Input
							id="id"
							type="text"
							placeholder="Tell us more details"
							readOnly
							textTransform="uppercase"
							value={selectedItem.id}
						/>
					</InputBox>
					{/* Input6 end */}
					<InputBox>
						<InputLabel htmlFor="description">Description</InputLabel>
						<Input
							id="description"
							type="text"
							placeholder="Tell us more details"
							defaultValue={selectedItem.description}
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
