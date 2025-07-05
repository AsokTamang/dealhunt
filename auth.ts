import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google({
    clientId:process.env.Client_ID!,
    clientSecret:process.env.Client_secret!
  })],   //here Google is taken as our authentication provider.
  trustHost:true   //this makes sure that all the host are true or trusted in the production mode
  ,
  session:{strategy:'jwt'},   //and jwt as the session strategy.
  secret:process.env.AUTH_SECRET!,  
  callbacks:{
    async jwt({token,user}){
        if(user){
            token.id=user.id.toString();   
            token.name=user.name;
            token.email=user.email;

        };
        return token;
    },
    async session({session,token}){
        if(token){
            session.user.id=token.id as string;
            session.user.name=token.name as string;
            session.user.email=token.email as string;
        };
        return session;
    }
    
 
  }
})