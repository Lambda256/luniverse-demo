import axios, { AxiosResponse } from "axios";
import { selector } from "recoil";
import Config from "../utils/config";
import { Keys } from "./keys";

export const defaultItemsAsyncState = selector({
  key: Keys.DEFAULT_ITEMS_ASYNC,
  get: async ({get}) => {
    try {
      const authToken = Config.AUTH_TOKEN

      const response: AxiosResponse = await axios.request({
        baseURL: Config.BASE_URL,
        url: Config.EVENTS_URL,
        method: "get",
        headers: {Authorization: `Bearer ${authToken}`},
        params: {          
          eventName: Config.CREATE,
          userName: Config.DEFAULT_ITEMS_USER_NAME,
          objectId: Config.DEFAULT_ITEMS_OBJECT_ID,
        },
      });

      const formattedResponse = response.data.data.events.items
			return formattedResponse
		} catch (error) {
			throw error
		} 
  }
})