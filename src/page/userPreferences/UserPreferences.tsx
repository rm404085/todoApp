import { useEffect } from "react";

import { setTheme, setLanguage, setLayout } from "@/redux/features/preference/preferenceSlice";
import type { PreferencesState } from "@/types/types";
import { UseAppDispatch, useAppSelector } from "@/redux/hook";

export default function UserPreferences() {
  const dispatch = UseAppDispatch();
  const { theme, language, layout } = useAppSelector(
    (state) => state.preferences as PreferencesState
  );

  // Apply theme, layout, and language classes to body
  useEffect(() => {
    const body = document.body;
    body.classList.remove("light", "dark", "grid", "list", "lang-en", "lang-bn");
    body.classList.add(theme, layout, language === "en" ? "lang-en" : "lang-bn");
  }, [theme, layout, language]);

  return (
    <div className="p-5 bg-gray-100 rounded-lg max-w-md mx-auto space-y-4">
      <h2 className="text-xl font-bold">
        {language === "en" ? "User Preferences" : "ব্যবহারকারীর পছন্দ"}
      </h2>

      {/* Theme Dropdown */}
      <div className="flex justify-between items-center">
        <span>{language === "en" ? "Theme:" : "থিম:"}</span>
        <select
          className="border rounded px-2 py-1"
          value={theme}
          onChange={(e) => dispatch(setTheme(e.target.value as "light" | "dark"))}
        >
          <option value="light">{language === "en" ? "Light" : "লাইট"}</option>
          <option value="dark">{language === "en" ? "Dark" : "ডার্ক"}</option>
        </select>
      </div>

      {/* Language Dropdown */}
      <div className="flex justify-between items-center">
        <span>{language === "en" ? "Language:" : "ভাষা:"}</span>
        <select
          className="border rounded px-2 py-1"
          value={language}
          onChange={(e) => dispatch(setLanguage(e.target.value as "en" | "bn"))}
        >
          <option value="en">{language === "en" ? "English" : "ইংরেজি"}</option>
          <option value="bn">{language === "en" ? "Bangla" : "বাংলা"}</option>
        </select>
      </div>

      {/* Layout Dropdown */}
      <div className="flex justify-between items-center">
        <span>{language === "en" ? "Layout:" : "লেআউট:"}</span>
        <select
          className="border rounded px-2 py-1"
          value={layout}
          onChange={(e) => dispatch(setLayout(e.target.value as "grid" | "list"))}
        >
          <option value="grid">{language === "en" ? "Grid" : "গ্রিড"}</option>
          <option value="list">{language === "en" ? "List" : "লিস্ট"}</option>
        </select>
      </div>
    </div>
  );
}
