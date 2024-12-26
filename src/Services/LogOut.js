import { logOut } from "./client";
import { toast, Bounce } from "react-toastify";


    export const handleLogout = async (navigate) => {

        try{
            const token = localStorage.getItem("token");
            if (token) {
                const res = await logOut(token);

                if(res.status === 200){

                    const data = await res.json();
                    const {message} = data;

                    localStorage.removeItem("token");
                    localStorage.removeItem("userId");

                    navigate('/', {state: {toastMessage: message}});

                } else {
                    const data = await res.json();
                    const errMessage = data.message;



                    toast.error(errMessage, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        transition: Bounce,
                      });
                }
            }

            
        } catch (err){
            console.log(err);


            toast.error("An unexpected error occurred", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
              });

        }
    }
