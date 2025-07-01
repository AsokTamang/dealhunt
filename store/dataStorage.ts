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
     category: string,
    price: string,
    rate: string,
    item: string,
    location: string
  ) => Promise<{ success: boolean; message: string }>;
  saveDeal:(title:string,link:string)=>Promise<{ success: boolean; message: string }>;
  reset: () => void;
}

export const valueStore = create<dataStoreType>((set) => ({
  links: [],
  titles: [],
  images: [],
  fetchDatas: async (category,price,rate,item,location) => {
    try {
      const res = await axios.post("/api/search", {category,price,rate, item, location });
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
  saveDeal:async(title:string,link:string)=>{
    try {
      const res=await axios.post('/api/deal',{title,link},{
        headers:{
          'Content-Type':'application/json'
        }
      });
      const {success,data,message}=res.data;
      if(success){
        return ({success:true,message:message})
      }
      else{
        return ({success:false,message:message})
      }
      
    } catch (error:unknown) {
      if(error instanceof Error){
        console.log(error.message);
        return ({success:false,message:error.message})
      }
       return ({success:false,message:'Deal saved unsuccessfull'})
      
    }

  }
  
  ,
  reset: () => set({ links: [], titles: [], images: [] }),
}));
