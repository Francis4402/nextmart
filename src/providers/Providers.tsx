"use client";

import UserProvider from "@/context/UserContext";
import StoreProviders from "./StoreProviders";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <StoreProviders> 
    <UserProvider>
      {children}
    </UserProvider>
  </StoreProviders>;
};

export default Providers;
