declare module "redux-persist/lib/storage" {
  import { WebStorage } from "redux-persist/lib/types";
  const storage: WebStorage;
  export default storage;
}
