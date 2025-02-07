import { v } from "convex/values";
import { mutation, query } from "./_generated/server";


export const CreateUser=mutation({
    args:{
        name:v.string(),
        email:v.string(),
        picture:v.string(),
        uid:v.string()
    },
    handler:async(ctx,args)=>{
        //if user is already exist 
        const user= await ctx.db.query('users').filter((q)=>q.eq(q.field('email'), args.email)).collect()
        console.log(user)
        // if not, then add new user
        if(user?.length==0){
            const result = await ctx.db.insert("users", {
              name: args.name,
              email: args.email,
              picture: args.picture,
              uid: args.uid,
              token:1000
            });
            console.log(result)
        }
    }
})

export const GetUser = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    if (!args.email) {
      throw new Error("Email is required");
    }
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .collect();
    return user[0] || null; // Return null if user not found
  },
});


export const UpdateToken = mutation({
  args: {
    token: v.number(),
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    console.log("Updating token for user:", args.userId);
    console.log("Received token:", args.token);

    // Check if token is NaN
    if (isNaN(args.token)) {
      console.error("Error: Received NaN for token.");
      return { error: "Invalid token value" };
    }

    // Proceed with the update
    await ctx.db.patch(args.userId, { token: args.token });

    // Fetch the updated user
    const updatedUser = await ctx.db.get(args.userId);
    console.log("Updated user:", updatedUser);

    return updatedUser;
  },
});


