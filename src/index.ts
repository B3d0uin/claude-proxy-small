import cors from "@elysiajs/cors";
import { Elysia } from "elysia";

const app = new Elysia();
app.use(cors());
app.all("v1/*", async (data) => {
   
   return fetch(`https://api.anthropic.com${data.path}`, {
	  method: data.request.method,
	  headers: {
		 "x-api-key": data.headers["x-api-key"],
		 "anthropic-version": data.headers["anthropic-version"]
		 
	  } as HeadersInit,
	  body: JSON.stringify(data.body)
   });
   
}, {
   mapResponse({response}) {
	  if (response instanceof Response) {
		 (response as Response).headers.delete("content-encoding");
		 (response as Response).headers.delete("transfer-encoding");
	  }
   }
   
});

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);