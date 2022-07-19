import axios, { AxiosResponse } from "axios";
import { selector } from "recoil";
import Config from "../utils/config";
import { apiKeysState } from "./apiKeysState";
import { Keys } from "./keys";

export const authTokenAsyncState = selector({
	key: Keys.AUTH_TOKEN_ASYNC,
	get: async ({ get }) => {
		const apiKeys = get(apiKeysState);
		try {
			if (apiKeys.accessKey !== "" || apiKeys.secretKey !== "") {
				const response: AxiosResponse<GenerateAuthTokenResponse, States.APIkeys> = await axios.request(
					{
						baseURL: Config.BASE_URL,
						url: Config.AUTH_TOKEN_URL,
						method: "post",
						data: {
							...apiKeys,
						},
					}
				);

				return response.data.data.authToken.token;
			}
			return null;
		} catch (error) {
			throw error
		}
	}
});