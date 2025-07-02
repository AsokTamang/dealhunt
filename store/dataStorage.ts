import { create } from "zustand";
import axios from "axios";
import { ObjectId } from "mongodb";

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

interface resultType {
  //this is the type of the object inside an array which is obtained from the return method of mongodb client.
  userid: ObjectId;
  title: string;
  link: string;
}

interface tagresultType {
  //this is the type of the object inside an array which is obtained from the return method of mongodb client.
  userid: ObjectId;
  tag:string;
  title: string;
  link: string;
}

interface tagType{
  tagTitle:string;
  link:string;
}

interface dataStoreType {
  links: string[];
  savedLinks: resultType[];
  taggedDeals:tagresultType[];
  titles: string[];
  images: string[];
  fetchDatas: (
    category: string,
    price: string,
    rate: string,
    item: string,
    location: string
  ) => Promise<{ success: boolean; message: string }>;
  saveDeal: (
    title: string,
    link: string
  ) => Promise<{ success: boolean; message: string }>;
  seeDeals: () => Promise<{ success: boolean; message: string }>;
  deleteDeal: (link: string) => Promise<{ success: boolean; message: string }>;
  addTag:   (tag: tagType) => Promise<{ success: boolean; message: string }>;
  fetchtagDeals: (tagname: string) => Promise<{ success: boolean; message: string }>;
  reset: () => void;
}

export const valueStore = create<dataStoreType>((set) => ({
  links: [],
  savedLinks: [],
  titles: [],
  images: [],
  taggedDeals:[],
  fetchDatas: async (category, price, rate, item, location) => {
    try {
      const res = await axios.post("/api/search", {
        category,
        price,
        rate,
        item,
        location,
      });
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
  saveDeal: async (title: string, link: string) => {
    try {
      const res = await axios.post(
        "/api/adddeal",
        { title, link },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { success, data, message } = res.data;
      if (success) {
        return { success: true, message: message };
      } else {
        return { success: false, message: message };
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
        return { success: false, message: error.message };
      }
      return { success: false, message: "Deal saved unsuccessfull" };
    }
  },

  seeDeals: async () => {
    try {
      const res = await axios.get("/api/seedeal"); //here we are using get method to fetch the datas from this endpoint
      const { success, data, message } = res.data;
      if (success) {
        set(() => ({
          savedLinks: data,
        }));
        return { success: true, message };
      }
      return { success: false, message };
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
        return { success: false, message: "Internal server error" };
      }

      return { success: false, message: "Internal server error" };
    }
  },

  deleteDeal: async (link) => {
    try {
      const res = await axios.delete("/api/deletedeal", {
        data: { link: link },
      }); //while using the delete method we must pass the object or the value inside a key which is in an object form that must be inside an object as a value having a key called data.
      const { success, data, message } = res.data;
      if (success) {
        set((state) => ({
          savedLinks: state.savedLinks.filter((item) => item.link !== link), //here we are removing the deal whose link matches with the link that we want to delete from.
        }));
        return { success: true, message };
      }
      return { success: false, message };
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
        return { success: false, message: error.message };
      }
      return { success: false, message: "Internal server error" };
    }
  },
  addTag:async(tag)=>{
     try {
      const res = await axios.post("/api/addtag", {
       tag
      },{
        headers:{
          'Content-Type':'application/json'
        }
      }); //while using the delete method we must pass the object or the value inside a key which is in an object form that must be inside an object as a value having a key called data.
      const { success, data, message } = res.data;
      if (success) {
       
        return { success: true, message };
      }
      else{
         return { success: false, message:'tag already added to this deal' };
      }
     
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
        return { success: false, message: 'tag already added to this deal' };
      }
      return { success: false, message: "Internal server error" };
    }

  },
  fetchtagDeals:async(tagname)=>{
     try {
      const res = await axios.get(`/api/fetchbytag/${tagname}`,
      ); //while using the delete method we must pass the object or the value inside a key which is in an object form that must be inside an object as a value having a key called data.
      const { success, data, message } = res.data;
      if (success) {
        set(()=>({
          taggedDeals:data
        }))
        return { success: true, message };
      }
      return { success: false, message };
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
        return { success: false, message: error.message };
      }
      return { success: false, message: "Internal server error" };
    }

  }
  ,
  reset: () => set({ links: [], titles: [], images: [], savedLinks: [],taggedDeals:[] }),
}));
