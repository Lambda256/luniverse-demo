import axios from "axios"
import { atom, selector } from "recoil"
import Config from "../utils/config"
import { Keys } from "./keys"

export const userItemsRefresher = atom({
  key: Keys.USER_ITEMS_REFRESHER,
  default: 0
})

export const userItemsAsyncState = selector({
  key: Keys.USER_ITEMS_ASYNC,
  get: async ({get}) => {
    try {
      const authToken = Config.AUTH_TOKEN
      get(userItemsRefresher)

      const response = await axios.request({
        baseURL: Config.BASE_URL,
        url: Config.EVENTS_URL,
        method: "get",
        headers: {Authorization: `Bearer ${authToken}`},
        params: {          
          eventName: Config.CREATE,
          userName: Config.USER_NAME,
          objectId: Config.USER_ITEMS_OBJECT_ID,
        },
      });

      const formattedResponse = response.data.data.events.items
			return formattedResponse
		} catch (error) {
			throw error
		} 
  }
})

export const createUserItemDataState = atom<ItemData | null>({
  key: Keys.CREATE_USER_ITEM_DATA,
  default: null,
})

export const createUserItemAsyncState = selector({
  key: Keys.CREATE_USER_ITEM_ASYNC,
  get: async ({get}) => {
    const bodyData = get(createUserItemDataState)
    if (!bodyData) return "empty"
    const authToken = Config.AUTH_TOKEN
    try {
      const response = await axios.request({
        baseURL: Config.BASE_URL,
        url: Config.EVENTS_URL,
        method: "post",
        headers: {Authorization: `Bearer ${authToken}`},
        data: {
          eventName: Config.CREATE,
          userName: Config.USER_NAME,
          objectId: Config.USER_ITEMS_OBJECT_ID,
          timestamp: Date.now()/1000,
          data: JSON.stringify(bodyData),
        },
      })
      return response.data
    } catch (error) {
      throw error
    }
  },
})

export const updateUserItemDataState = atom<ItemData | null>({
  key: Keys.UPDATE_USER_ITEM_DATA,
  default: null,
})

export const updateUserItemAsyncState = selector({
  key: Keys.UPDATE_USER_ITEM_ASYNC,
  get: async ({get}) => {
    const bodyData = get(updateUserItemDataState)
    if (!bodyData) return "empty"
    const authToken = Config.AUTH_TOKEN
    try {
      const response = await axios.request({
        baseURL: Config.BASE_URL,
        url: Config.EVENTS_URL,
        method: "post",
        headers: {Authorization: `Bearer ${authToken}`},
        data: {
          eventName: Config.ADD,
          userName: Config.USER_NAME,
          objectId: Config.USER_ITEMS_OBJECT_ID,
          timestamp: Date.now()/1000,
          data: JSON.stringify(bodyData),
        },
      })
      return response.data
    } catch (error) {
      throw error
    }
  },
})
