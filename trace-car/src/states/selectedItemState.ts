import axios from "axios";
import { selectorFamily } from "recoil";
import Config from "../utils/config";
import { Keys } from "./keys";

export const selectedItemAsyncState = selectorFamily<ItemData, Params>({
	key: Keys.SELECTED_ITEM_ASYNC,
	get:
		(arg) =>
		async ({ get }) => {
			try {
				const authToken = Config.AUTH_TOKEN;

				const response = await axios.request({
					baseURL: Config.BASE_URL,
					url: Config.EVENTS_URL + `/${arg.eventId}`,
					method: "get",
					headers: { Authorization: `Bearer ${authToken}` },
				});
				return JSON.parse(response.data.data.event.data);
			} catch (error) {
				throw error;
			}
		},
});
