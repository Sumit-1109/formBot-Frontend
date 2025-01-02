import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { sharedLinkAccess } from "../../Services/sharing";


function HandleLinkAccess() {

    const {token} = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    useEffect(() => {
        const verifyLink = async() =>{
            try{
                const res =await sharedLinkAccess(token);
                const data = await res.json();
                const {dashboardId,  redirect} = data;

                if(res.status === 401){
                    navigate(redirect);
                }

                if(res.status === 403){
                    setError('Access Denied');
                }

                if(res.data.redirect){
                    navigate(res.data.redirect);
                } 

                if(dashboardId){
                    navigate(`/dashboard/${dashboardId}`);
                }

            } catch (err) {
                console.log(err);
                setError('Invalid or expired link');
            }
        };
        
        verifyLink();
    }, [token, navigate]);

  return (
    <div>
      {error ? <p>{error}</p> : <p>loading ...</p>}
    </div>
  )
}

export default HandleLinkAccess
