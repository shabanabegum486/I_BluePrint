import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createWorkspace = mutation({
    args:{
        messages: v.any(),
        user: v.id("users")
    },

    handler: async(ctx, args) => {
        const workspaceId = await ctx.db.insert("workspace", {
            messages: args.messages,
            user: args.user
        });

        return workspaceId;
    }
})