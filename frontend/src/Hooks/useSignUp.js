import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();
    const navigate = useNavigate();
    const signups = async (input) => {
        const { name, email, password, confirmPassword, gender, phone, address } = input;
        const success = handleInputErrors({ name, email, password, confirmPassword, gender, phone, address });
        if (!success) return;

        setLoading(true);
        try {
            const res = await axios.post("http://localhost:8080/api/user/signup", input)
                .then((e) => {
                    localStorage.setItem("estore", JSON.stringify(e.data.data));
                    setAuthUser(e.data.data);
                    console.log(e.data);
                    if (!e) {
                        toast.error("user already exists");
                    } else {
                        toast.success("successful");
                        navigate('/');
                    }
                })
        } catch (error) {
            toast.error(error.response.data.error);
            // console.log(error.response.data)
        } finally {
            setLoading(false);
        }
    };

    return { loading, signups };
};
export default useSignup;

function handleInputErrors({ name, email, password, confirmPassword, gender, phone, address }) {
    if (!name || !email || !password || !confirmPassword || !gender || !phone || !address) {
        toast.error("Please fill in all fields");
        return false;
    }

    if (phone.length < 10) {
        toast.error("Phone Number is not Valid");
        return false;
    }

    if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return false;
    }

    if (password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return false;
    }

    return true;
}