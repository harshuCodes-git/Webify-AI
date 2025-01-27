import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
export const CreateWorkspace = mutation({
  args: {
    user: v.id("users"),
    messages: v.any(),
  },
  handler:async(ctx,args)=>{
    const worksSpaceID=await ctx.db.insert("workspace",{
        messages:args.messages,
        user:args.user,
    })
    return worksSpaceID;

  }
});

export const GetWorkspace = query({
  args: { worksSpaceID: v.optional(v.id("workspace")) },
  handler: async (ctx, args) => {
    console.log("Received args:", args); // Debug log
    const result = await ctx.db.get(args.worksSpaceID);
    return result;
  },
});

