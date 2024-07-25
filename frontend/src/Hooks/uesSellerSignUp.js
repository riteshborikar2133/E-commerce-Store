import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const useSellerSignUp = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();
    const navigate = useNavigate();
    const signups = async (input) => {
        const { name, storename, password, confirmPassword, email, gender } = input;
        const success = handleInputErrors({ name, storename, password, confirmPassword, email, gender });
        if (!success) return;

        setLoading(true);
        try {
            const res = await axios.post("http://localhost:8080/api/seller/signup", input)
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
export default useSellerSignUp;

function handleInputErrors({ name, storename, password, confirmPassword, email, gender }) {
    if (!name || !email || !password || !confirmPassword || !gender || !storename) {
        toast.error("Please fill in all fields");
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