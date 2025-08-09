import { Routes, Route, Navigate } from 'react-router-dom';
import { useauth } from './context/authcontext';
import Signup from './component/signup';
import Login from './component/login';
import Home from './component/home';

function App() {
  const [user] = useauth();
  console.log("user is", user);

  return (
    <Routes>
      {/* Redirect logged-in users away from signup/login */}
      <Route path="/" element={user ? <Navigate to="/Home" /> : <Signup />} />
      <Route path="/login" element={user ? <Navigate to="/Home" /> : <Login />} />

      {/* Protect /Home route: redirect to login if not logged in */}
      <Route path="/Home" element={user ? <Home /> : <Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
