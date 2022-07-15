import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Btn, Container, ErrorCode, ErrorMsg } from "./styled";

const Error: React.FC<ErrorType.Props> = ({ error, onClick }) => {
	const navigate = useNavigate();
	const handleOnClick = () => {
		if (!onClick) navigate("../");
		else onClick();
	};

	if (axios.isAxiosError(error)) return (
		<Container>
			<ErrorCode>{error.response?.data.code}</ErrorCode>
			<ErrorMsg>{error.response?.data.message}</ErrorMsg>
			<Btn onClick={handleOnClick}>Go back</Btn>
		</Container>
	)

	return (
		<Container>
			<ErrorMsg>{error.name}</ErrorMsg>
			<ErrorMsg>{error.message}</ErrorMsg>
			<Btn onClick={handleOnClick}>Go back</Btn>
		</Container>
	);
};

export default Error;
