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
    worksSpaceID:v.id('workspace'),
    messages:v.any()
  },
  handler:async(ctx,args)=>{
    const result =await ctx.db.patch(args.worksSpaceID,{
      messages:args.messages
    })
    return result
  }
})


export const UpdateFile = mutation({
  args: {
    worksSpaceID: v.optional(v.id("workspace")),
    files: v.any(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.patch(args.worksSpaceID, {
      file: args.files,
    });
    return result;
  },
});

export const GetAllWorkspace=query({
  args:{
    userId:v.id('users')
  },
  handler: async (ctx,args)=>{
    const result = await ctx.db.query('workspace').filter(q=>q.eq(q.field('user'),args.userId)).collect()
    return result; 
  }
})
