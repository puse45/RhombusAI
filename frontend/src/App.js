import './App.css';
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import Signin from "./components/UserAccount/Signin/Signin";
import Signup from "./components/UserAccount/Signup/Signup";
import Home from "./components/UserAccount/Home/Home";
import Create from "./components/UserAccount/Form/Create";
import Edit from "./components/UserAccount/Form/Edit";
import PrivateRoutes from './utils/ProtectedRoute';


const App = ()=> {
    return (
            <Router>
                <Routes>
                    <Route element={<PrivateRoutes />}>
                        <Route element={<Home/>} path="/" exact/>
                        <Route path="/document/create" element={<Create />} exact/>
                        <Route path="/document/edit/:id" element={<Edit />} exact/>
                    </Route>
                </Routes>
                <Routes>
                    <Route path="/signup" element={<Signup />} />
                    <Route  path="/signin" element={<Signin />} exact/>
                </Routes>
            </Router>
    );
};

export default App;
