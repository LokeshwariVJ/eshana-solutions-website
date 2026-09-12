import { logoIconSvg } from "@/lib/logo-mark";

export const contentType = "image/svg+xml";
export const size = { width: 48, height: 48 };

export default function Icon() {
  return new Response(logoIconSvg(), { headers: { "Content-Type": contentType } });
}
