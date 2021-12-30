import React,{useState, useEffect} from 'react'

const Contact = () => {
    const [userData, setuserData] = useState({name:"" , email:"", phone:"", message:""});
    const getContactPage = async () => {
        try {
            const res = await fetch('/getdata', {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json'
                },
            });

            const data = await res.json();
            console.log(data);
            setuserData({...userData,name:data.name , email:data.email , phone:data.phone});

            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getContactPage();
    }, []);

    //Storing data in state

    const handleInputs= (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setuserData({...userData,[name]:value});
    }

    // sending the  data to backend
    const sendContactData = async (e) =>{
        e.preventDefault();
        const {name , email, phone , message} = userData;

        const res = await fetch('/contact',{
            method: 'POST',
            headers:{'Content':'application/json'},
            body: JSON.stringify({
                name, email,phone, message
            })
        });

        const data = await res.json();

        if(!data){
            console.log('Message not send');
        }
        else{
            console.log(userData);
            window.alert('Message sent');
            setuserData({...userData,message:""});
        }
    }

    return (
        <>
            <section className="contactPage">
                <div className="contactCenter">
                    <form method="POST" id="contactForm">
                        <div className="contactHeading">
                            <h2>Contact Us</h2>
                        </div>
                        <div className="contactCredential">
                            <input type="text" id="contact_name" className="contact_name" 
                            name="name"
                            value={userData.name}
                            onChange={handleInputs}
                            placeholder="Enter your name" required/>

                            <input type="email" id="contact_email" className="contact_email" 
                            name="email"
                            value={userData.email}
                            onChange={handleInputs}
                            placeholder="Enter Your Email" required/>

                            <input type="number"  id="contact_number" className="contact_number" 
                            name="phone"
                            value={userData.phone}
                            onChange={handleInputs} 
                            placeholder="Enter your number" required/>
                        </div>

                        <div className="contactText">
                            <textarea className="contact_message" 
                            name="message"
                            value={userData.message}
                            onChange={handleInputs}  
                            placeholder="Message" cols="50" rows="10"></textarea>
                        </div>
                    </form>
                    <div className="contactformButton">
                            <button type="submit" className="contact_submit" onClick={sendContactData}>Submit</button>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Contact
