import { mutation } from "./_generated/server";
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
