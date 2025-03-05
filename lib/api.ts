import createClient from "openapi-fetch";
import type { paths } from "./types";
import { getTokenWithClerk } from "./utils";

type PathsWithMethod<T, M extends string> = {
  [P in keyof T]: T[P] extends { [key in M]: unknown } ? P : never;
}[keyof T];

type InferResponseType<
  Path extends keyof paths,
  Method extends keyof paths[Path],
> = paths[Path][Method] extends {
  responses: { 200: { content: { "application/json": infer R } } };
}
  ? R
  : never;

type InferRequestType<
  Path extends keyof paths,
  Method extends keyof paths[Path],
> = paths[Path][Method] extends {
  requestBody: { content: { "application/json": infer R } };
}
  ? R
  : never;

type InferPathParamsType<
  Path extends keyof paths,
  Method extends keyof paths[Path],
> = paths[Path][Method] extends { parameters: { path: infer R } } ? R : never;

type InferQueryParamsType<
  Path extends keyof paths,
  Method extends keyof paths[Path],
> = paths[Path][Method] extends { parameters: { query: infer R } } ? R : never;

type HasRequestBody<
  Path extends keyof paths,
  Method extends keyof paths[Path],
> = paths[Path][Method] extends { requestBody: any } ? true : false;

type ApiResponse<T> = {
  data?: T;
  ok: boolean;
  error?: string;
  isNetworkError?: boolean;
  status?: number;
};

const composeHeaders = async (): Promise<Record<string, string>> => {
  console.log("composeHeaders in api");
  const token = await getTokenWithClerk();
  console.log("token in api");
  console.log(token);
  return {
    Authorization: token ? `Bearer ${token}` : "",
    "Content-Type": "application/json",
  };
};

export const api = {
  get: async <Path extends PathsWithMethod<paths, "get">>(
    path: Path,
    pathParams?: InferPathParamsType<Path, "get">,
    queryParams?: InferQueryParamsType<Path, "get">
  ): Promise<ApiResponse<InferResponseType<Path, "get">>> => {
    try {
      const headers = await composeHeaders();
      console.log(`Headers for ${path}:`, headers);

      const client = createClient<paths>({
        baseUrl: process.env.NEXT_PUBLIC_API_URL,
      });

      const { data, error, response } = await client.GET(path as any, {
        headers,
        params: {
          path: pathParams || {},
          query: queryParams,
        },
      });

      return {
        data,
        ok: !error,
        error: error?.message,
        status: response?.status,
      };
    } catch (error) {
      console.error(`GET ${path} failed:`, error);
      console.error(`Error cause:`, (error as any)?.cause);

      if (
        error instanceof Error &&
        error.message === "Base URL not initialized"
      ) {
        return {
          ok: false,
          error: "API not initialized",
          isNetworkError: true,
        };
      }
      return {
        ok: false,
        error: error instanceof Error ? error.message : "Request failed",
        isNetworkError: true,
      };
    }
  },

  post: async <Path extends PathsWithMethod<paths, "post">>(
    path: Path,
    body?: InferRequestType<Path, "post">,
    pathParams?: InferPathParamsType<Path, "post">,
    queryParams?: InferQueryParamsType<Path, "post">
  ): Promise<ApiResponse<InferResponseType<Path, "post">>> => {
    console.log(`API POST ${path}`, { body, pathParams, queryParams });
    try {
      const client = createClient<paths>({
        baseUrl: process.env.NEXT_PUBLIC_API_URL,
      });

      const { data, error, response } = await client.POST(path as any, {
        headers: await composeHeaders(),
        body,
        params: {
          path: pathParams as any,
          query: queryParams,
        },
      });

      return {
        data,
        ok: !error,
        error: error?.message,
        status: response?.status,
      };
    } catch (error) {
      console.error(`POST ${path} failed:`, error);
      console.error(`Error cause:`, (error as any)?.cause);
      return {
        ok: false,
        error: error instanceof Error ? error.message : "Request failed",
        isNetworkError: true,
      };
    }
  },

  put: async <Path extends PathsWithMethod<paths, "put">>(
    path: Path,
    body: InferRequestType<Path, "put">,
    pathParams?: InferPathParamsType<Path, "put">,
    queryParams?: InferQueryParamsType<Path, "put">
  ): Promise<ApiResponse<InferResponseType<Path, "put">>> => {
    console.log(`API PUT ${path}`, { body, pathParams, queryParams });
    try {
      const client = createClient<paths>({
        baseUrl: process.env.NEXT_PUBLIC_API_URL,
      });

      const { data, error, response } = await client.PUT(path as any, {
        headers: await composeHeaders(),
        body,
        params: {
          path: pathParams as any,
          query: queryParams,
        },
      });

      return {
        data,
        ok: !error,
        error: error?.message,
        status: response?.status,
      };
    } catch (error) {
      console.error(`PUT ${path} failed:`, error);
      console.error(`Error cause:`, (error as any)?.cause);
      return {
        ok: false,
        error: error instanceof Error ? error.message : "Request failed",
        isNetworkError: true,
      };
    }
  },

  delete: async <Path extends PathsWithMethod<paths, "delete">>(
    path: Path,
    pathParams: InferPathParamsType<Path, "delete">,
    queryParams?: InferQueryParamsType<Path, "delete">
  ): Promise<ApiResponse<InferResponseType<Path, "delete">>> => {
    console.log(`API DELETE ${path}`, { pathParams, queryParams });
    try {
      const client = createClient<paths>({
        baseUrl: process.env.NEXT_PUBLIC_API_URL,
      });

      const { data, error, response } = await client.DELETE(path as any, {
        headers: await composeHeaders(),
        params: {
          path: pathParams as any,
          query: queryParams,
        },
      });

      return {
        data,
        ok: !error,
        error: error?.message,
        status: response?.status,
      };
    } catch (error) {
      console.error(`DELETE ${path} failed:`, error);
      console.error(`Error cause:`, (error as any)?.cause);
      return {
        ok: false,
        error: error instanceof Error ? error.message : "Request failed",
        isNetworkError: true,
      };
    }
  },
};

export default api;
