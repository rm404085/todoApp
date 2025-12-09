import { Outlet } from 'react-router';
import './App.css';
import Header from './components/header/Navbar';
import { useAppSelector } from './redux/hook';

function App() {
  // Redux থেকে preferences state
  const { theme, language, layout } = useAppSelector(
    (state) => state.preferences
  );

  return (
    <div className={`${theme} ${layout} lang-${language}`}>
      
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
