import { AuthProvider } from "./contexts/AuthContext";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <AuthProvider>
      <div className="App font-nunito">
        <AppRoutes />
      </div>
    </AuthProvider>
  );
};

export default App;