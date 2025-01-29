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

export const GetWorkspace=query({
  args:{worksSpaceID:v.id('workspace')},
  handler:async(ctx, args)=>{
    const result =await ctx.db.get(args.worksSpaceID);
    return result; 
  }
})

export const UpdateMessages=mutation({
  args:{
    workspaceId:v.id('workspace'),
    messages:v.any()
  },
  handler:async(ctx,args)=>{
    const result =await ctx.db.patch(args.workspaceId,{
      messages:args.messages
    })
    return result
  }
})
