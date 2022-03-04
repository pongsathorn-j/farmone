import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Loading from "./Loading";

const Auth = ({ children, role }) => {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const hasUser = !!session?.user;
  const router = useRouter();
  useEffect(() => {
    if (!loading) {
      if (!hasUser) {
        router.push("/signin");
      } else {
        if (role && role.indexOf(!!session?.role) === -1) {
          router.push("/404");
        }
      }
    }
  }, [hasUser, loading]);

  if (loading || !hasUser) {
    return <Loading />;
  }
  return children;
};

export default Auth;
