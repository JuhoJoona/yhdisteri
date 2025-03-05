import createFetchClient, { type Middleware } from "openapi-fetch";
import type { paths } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";

export const typedApiClient = createFetchClient<paths>({
  baseUrl: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000",
});

const middleware: Middleware = {
  async onRequest({ request }) {
    const currentUser = await auth();
    const token = await currentUser.getToken();
    request.headers.set("Authorization", `Bearer ${token}`);
    return request;
  },
};

typedApiClient.use(middleware);
