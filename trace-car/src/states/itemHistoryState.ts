import axios from "axios";
import { atom, selectorFamily } from "recoil";
import Config from "../utils/config";
import { Keys } from "./keys";
import { updateUserItemAsyncState } from "./userItemsState";

export const historyRefresher = atom({
	key: Keys.HISTORY_REFRESHER,
	default: 0,
});

export const historyAsyncState = selectorFamily({
	key: Keys.HISTORY_DATA_ASYNC,
	get: (id) => async ({ get }) => {
		try {
			const authToken = Config.AUTH_TOKEN;
			get(historyRefresher);
			get(updateUserItemAsyncState);
			
			const response = await axios.request({
				baseURL: Config.BASE_URL,
				url: Config.EVENTS_URL,
				method: "get",
				headers: { Authorization: `Bearer ${authToken}` },
				params: {
					eventName: Config.UPDATE,
					userName: Config.USER_NAME,
					objectId: Config.USER_ITEMS_OBJECT_ID,
					rpp: 100,
				},
			});

			const formattedResponse: EventsResponseItem[] =
				response.data.data.events.items.filter(
					(item: EventsResponseItem) =>
						JSON.parse(item.data).id === id
				);
			return formattedResponse;
			
		} catch (error) {
			throw error;
		}
	},
});
