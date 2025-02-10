"use client";

import React, { useEffect, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import SignInDialog from "./SignInDialog";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

import { useContext } from "react";
import { UserContext } from "@/app/userContext";
import { useRouter } from "next/navigation";


const suggestions = [
  "To-Do App",
  "Weather App",
  "Portfolio Website",
  "Note-Taking App",
  "Quiz App",
];
