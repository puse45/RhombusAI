import React from 'react';
import { Button } from 'antd';

const LogoutButton = ({ onClick }) => {
    return (
        <Button type="link" onClick={onClick}>
            Logout
        </Button>
    );
};

export default LogoutButton;
