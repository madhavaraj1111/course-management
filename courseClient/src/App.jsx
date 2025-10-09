import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "./store/slices/authSlice";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  useEffect(() => {
    // Auth is initialized from localStorage in authSlice
    dispatch(setLoading(false));
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="App font-nunito">
      <AppRoutes />
    </div>
  );
};

export default App;