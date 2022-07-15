import React, { useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { apiKeysState } from '../../states/apiKeysState';
import { authTokenAsyncState } from '../../states/authTokenState';
import { Btn, BtnWrap, Container, CopyIcon, Form, FormWrap, Input, InputBox, InputLabel, Title } from './styled'

const AuthTokenForm = () => {
	const [inputData, setInputData] = useState({
		accessKey: "",
		secretKey: "",
		expiresIn: 3600,
	})
	const setApiKeys = useSetRecoilState(apiKeysState);
	const authToken = useRecoilValue(authTokenAsyncState);

	// Get input data
	const handleOnChangeAccessKey = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputData({...inputData, accessKey: e.target.value});
	}
	
	const handleOnChangeSecretKey = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputData({...inputData, secretKey: e.target.value});
	}
	
	const handleOnChangeExpiresIn = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputData({...inputData, expiresIn: Number(e.target.value)});
	}

	// Set 'enter' to submit
	const handleOnEnter: React.KeyboardEventHandler<HTMLFormElement> = (e) => {
		if(e.key === "Enter") {
			submitData();
		}
	}
	
	// Submit Input data
	const handleOnClickSubmit = async (e: React.MouseEvent) => {
		e.preventDefault();
		submitData();
	};

	// Copy auth token
	const handleOnClickCopy = () => {
		const authToken: HTMLInputElement | null = document.querySelector("#result")
		if(authToken?.value) {
			navigator.clipboard.writeText(authToken.value)
			alert(`Copied! \n ${authToken.value}`)
		}
	}

	// Implement code when clicking submit or pressing enter
	const submitData = () => {
		let inputForm: HTMLFormElement | null =
			document.querySelector("#gernerate-form");

		// Check if required fields are filled out
		if (inputForm === null) return;
		if (!inputForm.checkValidity()) {
			inputForm.reportValidity()
			return
		};

		setApiKeys(inputData)
	}

  return (
    <Container>
			<FormWrap>
				<Title>Generate New Auth Token</Title>
				<Form id="gernerate-form" onKeyDown={handleOnEnter}>
					<InputBox>
						<InputLabel htmlFor="access-key" required={true}>
							Access Key
						</InputLabel>
						<Input
							id="access-key"
							required
              placeholder='dUf1hL3tKYL8vceXppK9CmRQa0Md4E...'
							onChange={handleOnChangeAccessKey}
							defaultValue={inputData.accessKey}
						/>
					</InputBox>
					{/* Input1 end */}
					<InputBox>
						<InputLabel htmlFor="secret-key" required={true}>
							Secret Key
						</InputLabel>
						<Input
							id="secret-key"
							required
              placeholder='K0Md4EL8vceXppK9CmRQdUf1hL3tKY...'
							onChange={handleOnChangeSecretKey}
							defaultValue={inputData.secretKey}
						/>
					</InputBox>
          {/* Input2 end */}
					<InputBox>
						<InputLabel htmlFor="expiry-value" required={true}>
							Expiry Value (seconds)
						</InputLabel>
						<Input
							id="expiry-value"
							required
							type="number"
							onChange={handleOnChangeExpiresIn}
              defaultValue="3600"
						/>
					</InputBox>
					{/* Input3 end */}
					<InputBox>
						<InputLabel htmlFor="result">
							Generated Auth Token {authToken && <CopyIcon onClick={handleOnClickCopy}/>}
						</InputLabel>
						<Input
							id="result"
							required
							type="text"
							readOnly
              value={authToken || ""}
						/>
					</InputBox>
					{/* Input4 end */}
				</Form>
				<BtnWrap>
					<Btn to="" onClick={handleOnClickSubmit}>
						Submit
					</Btn>
				</BtnWrap>
			</FormWrap>
		</Container>
  )
}

export default AuthTokenForm