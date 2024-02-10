import { useRouter } from "next/navigation";

const useRedirect = () => {
  const router = useRouter();

  const redirectTo = (location: string) => {
    router.push(location);
  };

  return {
    redirectTo,
  };
};

export default useRedirect;
