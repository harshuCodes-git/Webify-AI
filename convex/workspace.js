import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const CreateWorkspace = mutation({
  args: {
    user: v.id("users"),
    messages: v.any(),
  },
  handler: async (ctx, args) => {
    if (!args.user) {
      throw new Error("User ID is required to create a workspace");
    }

    const workspaceID = await ctx.db.insert("workspace", {
      messages: args.messages,
      user: args.user,
    });

    return workspaceID;
  },
});

export const GetWorkspace = query({
  args: { worksSpaceID: v.id("workspace") },
  handler: async (ctx, args) => {
    if (!args.worksSpaceID) {
      throw new Error("Workspace ID is required to fetch workspace data");
    }

    const result = await ctx.db.get(args.worksSpaceID);
    return result;
  },
});

export const UpdateMessages = mutation({
  args: {
    worksSpaceID: v.id("workspace"),
    messages: v.any(),
  },
  handler: async (ctx, args) => {
    if (!args.worksSpaceID) {
      throw new Error("Workspace ID is required to update messages");
    }

    const result = await ctx.db.patch(args.worksSpaceID, {
      messages: args.messages,
    });

    return result;
  },
});

export const UpdateFile = mutation({
  args: {
    worksSpaceID: v.id("workspace"),
    files: v.any(),
  },
  handler: async (ctx, args) => {
    if (!args.worksSpaceID) {
      throw new Error("Workspace ID is required to update files");
    }

    const result = await ctx.db.patch(args.worksSpaceID, {
      file: args.files,
    });

    return result;
  },
});

export const GetAllWorkspace = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    if (!args.userId) {
      throw new Error("User ID is required to fetch workspaces");
    }

    const result = await ctx.db
      .query("workspace")
      .filter((q) => q.eq(q.field("user"), args.userId))
      .collect();

    return result;
  },
});
