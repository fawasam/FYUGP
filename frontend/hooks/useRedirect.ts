import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const useRedirect = () => {
  const router = useRouter();
  let isAuthenticated = useSelector((state: RootState) => state.auth.userToken);

  const redirectTo = (location: string) => {
    router.push(location);
  };

  const redirectToHomeIfLoggedIn = () => {
    if (isAuthenticated) {
      redirectTo("/");
    }
  };

  return {
    redirectTo,
    redirectToHomeIfLoggedIn,
  };
};

export default useRedirect;
