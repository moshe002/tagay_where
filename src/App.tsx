import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { MapPage } from "./pages/MapPage";
import { LoginRegisterPage } from './pages/LoginRegisterPage';

function App() {

  const [user, setUser] = useState<{}>();

  return (
    <Routes>
      <Route path='/' element={<MapPage user={user} setUser={setUser} />} />
      <Route path='/login' element={<LoginRegisterPage setUser={setUser} />} />
    </Routes>
  )
}

export default App
