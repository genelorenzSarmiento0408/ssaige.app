import { redirect } from "next/navigation";

export default function RedirectFeature() {
  // Permanently redirect /feature to /features
  redirect("/features");
}

