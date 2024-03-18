import React from 'react';
import { useNavigate} from 'react-router-dom';
import LogoutButton from '../../../view/Logout/LogoutButton';
import Cookies from 'js-cookie'

const LogoutComponent = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        Cookies.remove('token');
        navigate('/signin');
    };
    return <LogoutButton onClick={handleLogout} />;
};

export default LogoutComponent;
