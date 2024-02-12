import { chainMiddlewares } from "./middlewares/chain-middlewares";
import { withAuth, withLang } from "./middlewares";

export default chainMiddlewares([
  withAuth, withLang,
]);