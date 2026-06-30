import type { JSX } from "react";

type EnumLike<T> = T[keyof T];
// type EnumPick<T, K extends keyof T> = T[K];

const ThemeMode = {
  DARK: "DARK",
  LIGHT: "LIGHT",
} as const;

type ThemeMode = EnumLike<typeof ThemeMode>;

type CustomThemeProviderProps = {
  children: JSX.Element;
};

export type { CustomThemeProviderProps, ThemeMode };
