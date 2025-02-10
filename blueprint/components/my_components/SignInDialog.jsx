import React, { useEffect, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import uuid4 from "uuid4";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useMutation } from "convex/react";

const SignInDialog = ({ openDialog, closeDialog }) => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    name: "",
  });


  const convex = useConvex();

  useEffect(() => {
      isAuthenticated()
  }, [])

  const isAuthenticated = async() => {
  if(typeof window !== undefined){
    const user = JSON.parse(localStorage.getItem("user"));
    const result = await convex.query(api.users.GetUser, {
      email: user?.email
    })

    setUserDetails(result);
    console.log(result)
  }
}

  const createUser = useMutation(api.users.CreateUser)

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      getUserInfo(tokenResponse?.access_token);
    },
  });

  async function getUserInfo(accessToken) {
    try {
      const response = await fetch(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user info");
      }

      const userInfo = await response.json();

      setUserDetails({
        email: userInfo?.email,
        name: userInfo?.name,
      });

      await createUser({
        name: userDetails?.name,
        email: userDetails?.email,
        uid: uuid4()
      })


      if(typeof window !== undefined){
        localStorage .setItem("user", JSON.stringify(userDetails))
      }
      closeDialog(false);

      return userInfo;
    } catch (error) {
      console.error("Error retrieving user info:", error);
    }
  }

  console.log(userDetails);

  return (
    <div>
      <Dialog open={openDialog} onOpenChange={closeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle></DialogTitle>
            <DialogDescription>
              <div className="flex flex-col justify-center items-center gap-3">
                <h1 className="text-xl text-center font-bold">
                  Continue with Blue Print
                </h1>
                <p className="mt-2 text-center">
                  Login into your account or Create one!
                </p>
                <Button
                  onClick={() => {
                    login();
                  }}
                  className="text-white bg-blue-600 mt-2 hover:bg-blue-500"
                >
                  Sign In with Google
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SignInDialog;
