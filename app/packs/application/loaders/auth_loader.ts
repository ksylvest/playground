import { type LoaderFunction, redirect } from "react-router";

export const AUTH_LOADER: LoaderFunction = async (args) => {
  const url = new URL(args.request.url);

  const token = localStorage.getItem("token") ?? sessionStorage.getItem("token");
  if (!token) return redirect(`/login?back=${url.pathname}`);

  return null;
};
