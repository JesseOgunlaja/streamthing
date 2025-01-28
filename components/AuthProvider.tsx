"use client";

import { refreshAccessToken } from "@/actions/auth/refresh-access-token";
import { useEffect } from "react";

const AuthProvider = () => {
  useEffect(() => {
    const interval = setInterval(refreshAccessToken, 50000);
    return () => clearInterval(interval);
  }, []);

  return null;
};

export default AuthProvider;
