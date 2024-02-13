import { chainMiddlewares } from "./middlewares/chain-middlewares";
import { withAuth, withLang } from "./middlewares";

export default chainMiddlewares([
  withAuth, 
  withLang,
]);

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: [
    '/((?!.+\\.[\\w]+$|_next).*)', 
    '/', 
    '/(api|trpc)(.*)', 
    '/((?!api|_next/static|_next/image|favicon.ico).*)'
  ]
}