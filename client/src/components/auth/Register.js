import { useState } from 'react';
import { Link } from 'react-router-dom';
import { register } from "../../actions/auth";
import { useDispatch } from 'react-redux';
const Register = () => {

    const dispatch = useDispatch();
    const [formData, updateFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmpw: "",
    })
    const { name, email, password, confirmpw } = formData;

    //onchange handle configured to handle change for all fields
    const onChange = (e) => updateFormData({
        ...formData,
        [e.target.name]: e.target.value,
    });

    //onSubmit handler
    const onSubmit = (e) => {
        e.preventDefault()
        if (password !== confirmpw){
            alert("Password not match");
        } else{
            dispatch(register({ name, email, password }));
        }
    }

    return (
        <div>
            <h1>Register </h1>
            <p>Specify your account info</p>
            <form onSubmit={(e) => onSubmit(e)}>
                <div>
                    <input
                        type="text"
                        placeholder='Name'
                        name="name"
                        value={name}
                        onChange={(e) => onChange(e)}
                        required
                    />
                </div>
                <div>
                    <input
                        type="email"
                        placeholder='Email address'
                        name="email"
                        value={email}
                        onChange={(e) => onChange(e)}
                        required
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder='Password'
                        name="password"
                        value={password}
                        onChange={(e) => onChange(e)}
                        minLength='4'
                        required
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder='Confirm password'
                        name="confirmpw"
                        value={confirmpw}
                        onChange={(e) => onChange(e)}
                        minLength='4'
                        required
                    />
                </div>
                <input type="submit" value="Register" />
                <p>
                    Already have an account? <Link to="/login">Log in </Link>
                </p>
            </form>
        </div>
    )
}

export default Register;
