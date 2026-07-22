import type { ApiError, ApiResponse } from "@/src/domain/types/api";
import type { SigninInput, SignupInput, UserPublic } from "@/src/domain/types/user";
import { baseApi } from "./base-api";

// injectEndpoints adds new endpoints to it without modifying the original. This is the "feature injection" pattern — each feature file adds its own endpoints to the shared base, rather than one giant API file.
const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    signin: build.mutation<UserPublic, SigninInput>({
      query: (body) => ({ url: "/sessions", method: "POST", body }),
      transformResponse: (response: ApiResponse<UserPublic>) => response.data as UserPublic,
      transformErrorResponse: (response) => {
        const body = response.data as ApiResponse<UserPublic>;
        return body?.error ?? ({ code: "unknown", message: "Something went wrong" } satisfies ApiError);
      },
    }),
    signup: build.mutation<UserPublic, SignupInput>({
      query: (body) => ({ url: "/users", method: "POST", body }),
      transformResponse: (response: ApiResponse<UserPublic>) => response.data as UserPublic,
      transformErrorResponse: (response) => {
        const body = response.data as ApiResponse<UserPublic>;
        return body?.error ?? ({ code: "unknown", message: "Something went wrong" } satisfies ApiError);
      },
    }),
  }),
});

export const { useSigninMutation, useSignupMutation } = authApi;
