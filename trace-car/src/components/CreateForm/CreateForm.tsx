import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	useRecoilState,
	useRecoilValue,
	useResetRecoilState,
	useSetRecoilState,
} from "recoil";
import {
	createUserItemAsyncState,
	createUserItemDataState,
	userItemsRefresher,
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
const randomNumber = Math.floor(Math.random() * 10);

const InputForm: React.FC<InputFormType.InputForm> = () => {
	const navigate = useNavigate();
	const setItemData = useSetRecoilState(createUserItemDataState);
	const resetItemData = useResetRecoilState(createUserItemDataState);
	const [inputData, setInputData] = useState({
		id: "",
		image: randomNumber,
		owner: Config.USER_NAME,
		plateNumber: "",
		model: "",
		year: 0,
		mileage: 0,
		description: "",
	});
	useRecoilValue(createUserItemAsyncState);
	const [refresher, setRefresher] = useRecoilState(userItemsRefresher); // Refreshing user items

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

	const handlePlateOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputData({
			...inputData,
			plateNumber: e.target.value,
		});
	};

	const handleModelOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputData({
			...inputData,
			model: e.target.value,
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

	const handleIdOnChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setInputData({
			...inputData,
			id: e.target.value,
		});
	};

	const handleDescriptionOnChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setInputData({
			...inputData,
			description: e.target.value,
		});
	};

	return (
		<Container>
			<FormWrap>
				<Title>Create your item</Title>
				<ImgWrap>
					<IMG src={`/assets/images/vehicle${randomNumber}.png`} />
				</ImgWrap>
				<Form id="input-form" onKeyDown={handleOnEnter}>
					<InputBox>
						<InputLabel htmlFor="owner">Owner</InputLabel>
						<Input
							id="owner"
							readOnly
							placeholder="William"
							textTransform="uppercase"
							value={Config.USER_NAME}
						/>
					</InputBox>
					{/* Input1 end */}
					<InputBox>
						<InputLabel htmlFor="plate" required>
							Plate Number
						</InputLabel>
						<Input
							id="plate"
							required
							placeholder="NY737ZN"
							textTransform="uppercase"
							onChange={handlePlateOnChange}
						/>
					</InputBox>
					{/* Input2 end */}
					<InputBox>
						<InputLabel htmlFor="model" required>
							Model
						</InputLabel>
						<Input
							id="model"
							required
							placeholder="Car model"
							textTransform="uppercase"
							onChange={handleModelOnChange}
						/>
					</InputBox>
					{/* Input3 end */}
					<InputBox>
						<InputLabel htmlFor="year" required>
							Year
						</InputLabel>
						<Input
							id="year"
							type="number"
							min="1900"
							max="2099"
							step="1"
							required
							placeholder={`${new Date().getFullYear()}`}
							onChange={handleYearOnChange}
						/>
					</InputBox>
					{/* Input4 end */}
					<InputBox>
						<InputLabel htmlFor="mileage" required>
							Mileage (km)
						</InputLabel>
						<Input
							id="mileage"
							type="number"
							min={0}
							required
							placeholder="0"
							onChange={handleMileageOnChange}
						/>
					</InputBox>
					{/* Input5 end */}
					<InputBox>
						<InputLabel htmlFor="id" required>VIN</InputLabel>
						<Input
							id="id"
							type="text"
							placeholder="Vehicle ID Number"
							textTransform="uppercase"
							onChange={handleIdOnChange}
						/>
					</InputBox>
					{/* Input6 end */}
					<InputBox>
						<InputLabel htmlFor="description">Description</InputLabel>
						<Input
							id="description"
							type="text"
							placeholder="Tell us more details"
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

export default InputForm;
