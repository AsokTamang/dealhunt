import { create } from "zustand";
import axios from "axios";

interface objectProps {
  kind: string;
  title: string;
  htmlTitle: string;
  link: string;
  displayLink: string;
  snippet: string;
  htmlSnippet: string;
  formattedUrl: string;
  htmlFormattedUrl: string;
  pagemap: any;
}

interface dataStoreType {
  links: string[];
  titles: string[];
  images: string[];
  fetchDatas: (
    item: string,
    location: string
  ) => Promise<{ success: boolean; message: string }>;
  reset: () => void;
}

export const valueStore = create<dataStoreType>((set) => ({
  links: [],
  titles: [],
  images: [],
  fetchDatas: async (item, location) => {
    try {
      const res = await axios.post("/api/search", { item, location });
      const { success, data } = res.data;

      if (success && Array.isArray(data) && data.length > 0) {
        set(() => ({
          links: data.map((obj: objectProps) => obj.link),
          titles: data.map((obj: objectProps) => obj.title),
          images: data.map(
            (obj: objectProps) => obj.pagemap?.cse_thumbnail?.[0]?.src || null
          ),
        }));
        return { success: true, message: "Data fetched successfully." };
      } else {
        return { success: false, message: "No results found." };
      }
    } catch (err) {
      console.error("Zustand fetch error:", err);
      return { success: false, message: "Failed to fetch data." };
    }
  },
  reset: () => set({ links: [], titles: [], images: [] }),
}));
