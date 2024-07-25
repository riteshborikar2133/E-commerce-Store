import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();
    const navigate = useNavigate();

    const logouts = async () => {
        setLoading(true);
        try {
            const res = await axios.post('http://localhost:8080/api/user/logout')
            if (res) {
                console.log(res)
                localStorage.removeItem('estore')
                setAuthUser(false)
                toast.success("logout successfully")
                navigate('/login')
            }
        }
        catch (error) {
            toast.error(error.response.data.error);

        } finally {
            setLoading(false);
        }
    }
    return { loading, logouts }
}

export default useLogout;