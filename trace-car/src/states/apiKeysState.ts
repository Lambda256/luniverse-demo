import { atom } from "recoil";
import { Keys } from "./keys";

export const apiKeysState = atom<States.APIkeys>({
	key: Keys.API_KEYS,
	default: {
		accessKey: "",
		secretKey: "",
		expiresIn: 0,
	},
});
