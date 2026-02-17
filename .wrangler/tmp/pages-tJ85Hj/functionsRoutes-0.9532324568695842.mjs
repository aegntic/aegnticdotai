import { onRequestPost as __api_contact_ts_onRequestPost } from "/home/ae/AE/02_Showcase/aegnticdotai/functions/api/contact.ts"
import { onRequestPost as __api_subscribe_ts_onRequestPost } from "/home/ae/AE/02_Showcase/aegnticdotai/functions/api/subscribe.ts"

export const routes = [
    {
      routePath: "/api/contact",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_contact_ts_onRequestPost],
    },
  {
      routePath: "/api/subscribe",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_subscribe_ts_onRequestPost],
    },
  ]