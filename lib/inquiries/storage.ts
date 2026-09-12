import "server-only";
import { createInquiryClient } from "../supabase/server";
import type { Inquiry } from "./validation";
import type { StoredInquiry } from "./submit";

export async function insertInquiry(inquiry: Inquiry): Promise<StoredInquiry> {
  const { data, error } = await createInquiryClient().from("inquiries")
    .insert(inquiry).select("id, created_at").abortSignal(AbortSignal.timeout(8000)).single();
  if (error || !data?.id || !data.created_at) throw new Error("Inquiry insert failed");
  return { ...inquiry, id: data.id, created_at: data.created_at };
}
