import { Intervals } from "./types/types";

export const API_DOMAIN = "https://champagne-basket-clam-garb.cyclic.app";

export const API_DAILY = "/api/daily";

// export const API_SEARCH = "/api/search-fin";
export const API_SEARCH = "/api/search-fid";

export const DEFAULT_INTERVAL: Intervals = "6M";

export const DEFAULT_COMPANY = {
  symbol: "BRK-A",
  desc: "Berkshire Hathaway Inc Class A",
};

export const BUTTON_INTERVALS: Intervals[] = ["6D", "1M", "6M", "1Y", "5Y"];
