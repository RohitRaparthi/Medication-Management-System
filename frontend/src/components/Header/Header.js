import { useNavigate } from 'react-router-dom';
import './index.css'

function Header() {
  const navigate = useNavigate();
  
  const OnClickLogout = () => {
    localStorage.clear();
    navigate('/login');
  }

  return (
    <nav className="navbar">
      <h1>MediCare Companion</h1>
      <button onClick={OnClickLogout} type="button" className="logoutbtn">
        Logout
      </button>
    </nav>
  )
}

export default Header;
