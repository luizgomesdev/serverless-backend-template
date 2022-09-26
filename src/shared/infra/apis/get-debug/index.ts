import { handlerPath } from "@shared/libraries/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: "get",
        path: "debug",
      },
    },
  ],
};
