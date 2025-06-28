import NextAuth from "next-auth";
declare module "next-auth" {
    interface JWT{
        id:string;
        name:string;
    }
    interface Session{
        user :{
            id:string;
            name:string;
            
        }
        

    }
    interface User {
        id:string;
        name:string;
    }
}