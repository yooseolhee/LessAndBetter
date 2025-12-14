export const THEMES = {
  green: {
    label: "그린 (기본)",
    bg: "bg-green-50",
    primary: "green",
  },
  blue: {
    label: "블루",
    bg: "bg-blue-50",
    primary: "blue",
  },
  purple: {
    label: "퍼플",
    bg: "bg-purple-50",
    primary: "purple",
  },
  dark: {
    label: "다크",
    bg: "bg-gray-100",
    primary: "gray",
  },
} as const;

export type ThemeKey = keyof typeof THEMES;
