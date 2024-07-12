import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, clearAuth } from "@/redux/auth/auth.slice";
import { RootState } from "@/redux/store";
import axios from "axios";

const useAuthSession = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    const checkAuthSession = async () => {
      if (token) {
        try {
          const response = await axios.get('/api/auth/user', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          dispatch(setUser({ username: response.data.username }));
        } catch (error) {
          dispatch(clearAuth());
        }
      }
    };

    checkAuthSession();
  }, [token, dispatch]);

  return { user };
};

export default useAuthSession;
