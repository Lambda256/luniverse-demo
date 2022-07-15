import axios from "axios";
import { atom, selector } from "recoil";
import Config from "../ts/config";
import { Keys } from "./keys";
import { selectedItemState } from "./selectedItemState";
import { addUserItemAsyncState } from "./userItemsState";

export const historyRefresher = atom({
	key: Keys.HISTORY_REFRESHER,
	default: 0,
});

export const historyState = atom<ItemData | null>({
	key: Keys.HISTORY_DATA,
	default: null,
});

export const historyAsyncState = selector({
	key: Keys.HISTORY_DATA_ASYNC,
	get: async ({ get }) => {
		try {
			const authToken = Config.AUTH_TOKEN;
			get(historyRefresher);
			get(addUserItemAsyncState);
			const selectedItem = get(selectedItemState);

			if (selectedItem) {
				const response = await axios.request({
					baseURL: Config.BASE_URL,
					url: Config.EVENTS_URL,
					method: "get",
					headers: { Authorization: `Bearer ${authToken}` },
					params: {
						eventName: Config.ADD,
						userName: Config.USER_NAME,
						objectId: Config.USER_ITEMS_OBJECT_ID,
						timestamp: Date.now() / 1000,
					},
				});

				const formattedResponse: EventsResponseItem[] =
					response.data.data.events.items.filter(
						(item: EventsResponseItem) =>
							JSON.parse(item.data).id === selectedItem.id
					);
				return formattedResponse;
			}
			return [];
		} catch (error) {
			throw error;
		}
	},
});
