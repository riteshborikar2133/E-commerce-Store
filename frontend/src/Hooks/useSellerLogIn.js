import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const useSellerlogin = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();
    const navigate = useNavigate();

    const sellerlogin = async (input) => {
        const { email, password } = input;
        const success = handleInputError({ email, password })
        if (!success) return;

        setLoading(true);
        try {
            const res = await axios.post("http://localhost:8080/api/seller/login", input)
                .then((e) => {
                    localStorage.setItem("estore", JSON.stringify(e.data.data));
                    setAuthUser(e.data.data)
                    toast.success(e.data.message);
                    navigate('/seller/homepage')
                })
        } catch (error) {
            toast.error(error.response.data.error);
        } finally {
            setLoading(false);
        }
    }
    return { loading, sellerlogin };
}

export default useSellerlogin;

const handleInputError = ({ email, password }) => {
    if (!email || !password) {
        toast.error("Please fill all details")
        return false;
    }

    return true;
}