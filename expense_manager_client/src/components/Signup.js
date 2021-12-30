import React, {useState} from 'react';
import { NavLink ,useHistory} from 'react-router-dom';
import signupPic from '../images/signup.png';

function Signup() {
    const history = useHistory();
    const [user,setUser] = useState({
        name:"",email:"",phone:"",work:"",password:"",confirmPassword:""
    });
    let name,value;
    const handleInputs = (e) => {
        console.log(e);
        name = e.target.name;
        value = e.target.value;

        setUser({...user,[name]:value});
    }

    const sendData = async(e) => {
        e.preventDefault();
        const {name,email,phone,work,password,confirmPassword} =user;

        const res = await fetch('/signup',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name:name,email:email,phone:phone,work:work,password:password,confirmPassword:confirmPassword})
        });

        const data = await res.json();

        if(data.status === 422 || !data){
            window.alert('Invalid field values');
            console.log("Invalid registration");
        }
        else{
            window.alert('Registration Successfl!');
            console.log("Registration Successfl");

            history.push('/Login');
        }
    }


    return (
        <>

            <section className="signup">
                <div className="signupForm">
                    <form method="POST" className="registerForm" id="registerForm">
                        <h2 className="signupTitle">Signup</h2>
                        <div className="formGroup">
                            <label className="formLabel" htmlFor="name">
                                <i class="zmdi zmdi-account"></i>
                            </label>
                            <input type="text" name="name" id="name" autoComplete="off" 
                            value={user.name}
                            onChange={handleInputs}
                            placeholder="Your Name" />
                        </div>
                        <div className="formGroup">
                            <label className="formLabel" htmlFor="email">
                                <i class="zmdi zmdi-email"></i>
                            </label>
                            <input type="email" name="email" id="email" autocomplete="off" 
                            value={user.email}
                            onChange={handleInputs}
                            placeholder="E-mail" />
                        </div>
                        <div className="formGroup">
                            <label className="formLabel" htmlFor="phone">
                                <i class="zmdi zmdi-phone-end"></i>
                            </label>
                            <input type="number" name="phone" id="phone" autoComplete="off" 
                            value={user.phone}
                            onChange={handleInputs}
                            placeholder="Your Number" />
                        </div>
                        <div className="formGroup">
                            <label className="formLabel" htmlFor="work">
                                <i class="zmdi zmdi-slideshare"></i>
                            </label>
                            <input type="text" name="work" id="work" autoComplete="off" 
                            value={user.work}
                            onChange={handleInputs}
                            placeholder="Your Profession" />
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
                        <div className="formGroup">
                            <label className="formLabel" htmlFor="confirmPassword">
                                <i class="zmdi zmdi-key"></i>
                            </label>
                            <input type="password" name="confirmPassword" id="confirmPassword" autoComplete="off" 
                            value={user.confirmPassword}
                            onChange={handleInputs}
                            placeholder="Confirm Password" />
                        </div>
                        <div className="submit">
                            <input type="submit" name="signup" id="signup" className="submiButton" value="signup" onClick={sendData}/>
                        </div>
                    </form>
                    <div className="signupPic">
                        <figure>
                            <img src={signupPic} alt="signup image" />
                        </figure>
                        <NavLink to="/Login" className="loginShortcut">Already have an account</NavLink>
                    </div>
                </div>
            </section>

        </>
    )
}

export default Signup
