import { atom } from "recoil";

export interface darkModeTypes {
  theme: string;
}

export const darkModeState = atom<darkModeTypes>({
  key: "darkModeState",
  default: {
    theme: "darkTheme",
  },
});
