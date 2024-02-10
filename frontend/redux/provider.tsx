"use client";

import { useEffect } from "react";
import { loadUserFromStorage, setUser } from "./features/authSlice";
import { store } from "./store";
import { Provider } from "react-redux";

export function Providers({ children }: { children: React.ReactNode }) {
  const storedUser = loadUserFromStorage();

  // Load user data from localStorage on initial render
  useEffect(() => {
    if (storedUser) {
      // Dispatch setUser action with the stored user data
      store.dispatch(setUser(storedUser));

      // Redirect to home page after initial render
      // redirectToHome();
    }
  }, []);
  return <Provider store={store}>{children}</Provider>;
}
