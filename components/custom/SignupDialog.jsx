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


const SignupDialog = ({openDia, closeDialog}) => {
  const{
    userDetails, setUserDetails
  }=useContext(UserDetailsContext)
  
const googleLogin = useGoogleLogin({
  onSuccess: async (tokenResponse) => {
    console.log(tokenResponse);
    const userInfo = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      { headers: { Authorization: "Bearer "+tokenResponse?.access_token } }
    );

    console.log(userInfo);
    setUserDetails(userInfo?.data)
    closeDialog(false)
  },
  onError: (errorResponse) => console.log(errorResponse),
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
            <div className="flex flex-col items-center justify-center">
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
