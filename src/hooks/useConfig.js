import { useState } from "react";
import { DEFAULT_URLS } from "../constants/portals";

export const useConfig = () => {
  const [customUrls, setCustomUrls] = useState(() => {
    const saved = localStorage.getItem("bt_custom_urls");
    if (saved) {
      try {
        return { ...DEFAULT_URLS, ...JSON.parse(saved) };
      } catch (e) {}
    }
    return DEFAULT_URLS;
  });

  const handleUrlChange = (portal, value) => {
    const updated = { ...customUrls, [portal]: value };
    setCustomUrls(updated);
    localStorage.setItem("bt_custom_urls", JSON.stringify(updated));
  };

  return { customUrls, handleUrlChange };
};
