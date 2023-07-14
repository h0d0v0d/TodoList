import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAppSelector } from "../hooks";
import { authSelectors } from "../../features/auth";

export function withRedirect<T>(BaseComponent: FC<T>): FC<T> {
  return (props: any) => {
    const isAuth = useAppSelector(authSelectors.isLoggedIn);
    const navigate = useNavigate();
    useEffect(() => {
      if (isAuth === null) return;
      if (isAuth === false) {
        return navigate("/login");
      }
    }, [isAuth, navigate]);

    if (isAuth === null) {
      return <Loader />;
    }
    return <BaseComponent {...props} />;
  };
}

const Loader = () => {
  return <h2>Loader</h2>;
};
