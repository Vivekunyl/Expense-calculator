import React,{useState} from 'react'
import {NavLink,useHistory} from 'react-router-dom';

const Login = () => {
    const history = useHistory();
    const [user,setUser] = useState({
        email:"",password:""
    });
    let name,value;
    const handleInputs = (e) => {
        console.log(e);
        name = e.target.name;
        value = e.target.value;

        setUser({...user,[name]:value});
    }
    const loginUser = async(e)=>{
        e.preventDefault();
        const {email,password} = user;
        const res = await fetch('/login',{
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify({email:email , password:password})
        });

        const data = await res.json();

        if(data.status === 400 || !data){
            window.alert('Invalid credentials');
            console.log('Invalid credentials');
        }
        else{
            window.alert('Login Successfull');
            history.push('/');
        }
    }

    return (
        <>
            <section className="signup">
                <div className="loginForm">
                    <form method="POST" className="registerForm" id="registerForm">
                        <h2 className="signupTitle">Login</h2>
                        <div className="formGroup">
                            <label className="formLabel" htmlFor="email">
                                <i class="zmdi zmdi-email"></i>
                            </label>
                            <input type="email" name="email" id="email" autoComplete="off"
                            value={user.email}
                            onChange={handleInputs}
                            placeholder="E-mail" />
                        </div>
                        <div className="formGroup">
                            <label className="formLabel" htmlFor="password">
                                <i class="zmdi zmdi-key"></i>
                            </label>
                            <input type="password" name="password" id="password" autoComplete="off" 
                            value={user.password}
                            onChange={handleInputs}
                            placeholder="Password" />
                        </div>
                        <div className="submit">
                            <input type="submit" name="login" id="login" className="submiButton" value="login" onClick={loginUser}/>
                        </div>
                        <div className="linkToSignup">
                            <p>Don't have one?</p>
                            <NavLink to="/Signup" className="signupShortcut">Create an account</NavLink>
                        </div>
                    </form>
                </div>
            </section>

        </>
    )
}

export default Login
