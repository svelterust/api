import { Elysia } from "elysia";
import { validateSessionToken, type SessionValidationResult } from "$lib/session";

// Middleware for user and session
export const auth = new Elysia().derive({ as: "global" },
  async (context): Promise<SessionValidationResult> => {
    // Get token from header and validate
    const token = context.request.headers.get("Authorization")?.split(" ")[1];
    if (!token) return { user: null, session: null };
    return validateSessionToken(token);
  }
);
