import React, {useState,useEffect} from 'react';
import {NavLink} from 'react-router-dom';

const Home = () => {
    const [userName, setuserName] = useState('');
    const [show,setShow] = useState(false);
    const userHome = async () => {
        try {
            const res = await fetch('/getdata', {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json'
                },
            });

            const data = await res.json();
            console.log(data);
            setuserName(data.name);
            setShow(true);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        userHome();
    }, []);

    return (
        <>
            <section className="home_area">
                <div className="homeElement">
                    <div className="homeheading">
                        <h2>Welcome to Expense Calculator</h2>
                        <p>Now track your expenses with ease</p>
                    </div>
                    <div className="user">
                        <h2>Hi {userName}</h2>
                    </div>
                    
                </div>
                <div className="link">
                        <NavLink to="/Signup" className="signupShortcut mrgn">{show ? '': 'Create an account'}</NavLink>
                        <NavLink to="/Login" className="loginShortcut mrgn">{show ?'' : 'Login'}</NavLink>
                </div>
                <div className="linkforVerifiedUser">
                    <NavLink to="/Dashboard" className="signupShortcut mrgn">{show ?'Go to Dashboard' : ''}</NavLink>
                    <NavLink className="signupShortcut mrgn" to="/logout">{ show ? 'Logout' : ''}</NavLink>
                </div>
            </section>
        </>
    )
}

export default Home
