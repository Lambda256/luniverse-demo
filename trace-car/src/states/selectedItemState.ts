import { atom } from "recoil";
import { Keys } from "./keys";

export const selectedItemState = atom({
	key: Keys.SELECTED_ITEM,
	default: {} as ItemData,
});

export const selectedItemRecentHistoryState = atom({
  key: Keys.SELECTED_ITEM_RECENT_HISTORY,
  default: {} as ItemData
})