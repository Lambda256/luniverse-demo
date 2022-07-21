import axios from "axios";
import { atom, selectorFamily } from "recoil";
import Config from "../utils/config";
import { Keys } from "./keys";

export const selectedItemsRefresher = atom({
  key: Keys.SELECTED_ITEMS_REFRESHER,
  default: 0
})

export const selectedItemAsyncState = selectorFamily<ItemData, Params>({
	key: Keys.SELECTED_ITEM_ASYNC,
	get:
		(arg) =>
		async ({ get }) => {
			try {
				const authToken = Config.AUTH_TOKEN;
				get(selectedItemsRefresher)
				const response = await axios.request({
					baseURL: Config.BASE_URL,
					url: Config.EVENTS_URL + `/${arg.eventId}`,
					method: "get",
					headers: { Authorization: `Bearer ${authToken}` },
				});
				let tx = response.data.data.event.tx;
				let txHash = "";
				if (tx.receipt) {
					txHash = JSON.parse(response.data.data.event.tx.receipt).txHash;
				}
				const itemData = JSON.parse(response.data.data.event.data);
				return { ...itemData, txHash, responseData: response.data };
			} catch (error) {
				throw error;
			}
		},
});
