import React, { useContext } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Lookup from '@/data/Lookup';
import { Button } from '../ui/button';
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import { UserDetailsContext } from '@/context/UserDetailsContext';
import axios from "axios"
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { CreateUser } from '@/convex/users';
import { v4 as uuid4 } from "uuid";



const SignupDialog = ({openDia, closeDialog}) => {
  const{
    userDetails, setUserDetails
  }=useContext(UserDetailsContext)
  const createUser=useMutation(api.users.CreateUser)
  
const googleLogin = useGoogleLogin({
  onSuccess: async (tokenResponse) => {
    try {
      console.log(tokenResponse);

      // Fetch user info from Google
      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: "Bearer " + tokenResponse?.access_token } }
      );

      console.log(userInfo);
      const user = userInfo.data;

      // Call the mutation using the useMutation hook
      await createUser({
        name: user.name,
        email: user.email,
        picture: user.picture,
        uid: uuid4(),
      });

      // Save user data to local storage
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(user));
      }

      // Update user details in context
      setUserDetails(userInfo?.data);

      // Close the dialog
      closeDialog(false);
    } catch (error) {
      console.error("Error during Google login:", error);
    }
  },
  onError: (errorResponse) =>
    console.error("Google login error:", errorResponse),
});

  return (
    <Dialog open={openDia} onOpenChange={closeDialog} suppressHydrationWarning>
      <DialogContent suppressHydrationWarning>
        <DialogHeader suppressHydrationWarning>
          <DialogTitle suppressHydrationWarning></DialogTitle>

          <DialogDescription
            className="flex flex-col items-center justify-center"
            suppressHydrationWarning
          >
            <div
              className="flex flex-col items-center justify-center"
              suppressHydrationWarning
            >
              <h2
                className="font-bold text-xl text-white text-center"
                suppressHydrationWarning
              >
                {Lookup.SIGNIN_HEADING}
              </h2>
              <p className="mt-2 text-center" suppressHydrationWarning>
                {Lookup.SIGNIN_SUBHEADING}
              </p>
              <Button
                className="m-3  items-center justify-center"
                onClick={googleLogin}
                suppressHydrationWarning
              >
                Sign In with <FcGoogle />
                Google
              </Button>
              <p className="" suppressHydrationWarning>
                {Lookup?.SIGNIn_AGREEMENT_TEXT}
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default SignupDialog
