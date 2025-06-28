import { apiRequest } from "./queryClient";
import type { ReplyRequest, ReplyResponse } from "@shared/schema";

export const replyApi = {
  generateReplies: async (data: ReplyRequest): Promise<ReplyResponse> => {
    const response = await apiRequest("POST", "/api/reply", data);
    return response.json();
  },
};
