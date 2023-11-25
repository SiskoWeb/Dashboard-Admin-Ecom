// Without a defined matcher, this one line applies next-auth
// to the entire project
export { default } from "next-auth/middleware";

// export function middleware(request:Request){

//     const regex = new RegExp('/api/*')

//     if(regex.test(request.url)){
//     // add somthing for this line
//     }

// }

// Applies next-auth only to matching routes - can be regex
// Ref: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = { matcher: ["/list", "/admin"] };
