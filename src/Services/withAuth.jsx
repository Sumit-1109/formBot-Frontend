import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function withAuth(Component) {
    return function AuthenticatedComponent(props) {
        const navigate = useNavigate();

        useEffect(() => {
            const token = localStorage.getItem('token');

            if (!token ) {
                navigate('/signIn');
            }
        }, [navigate]);

        if (!Component) {
            console.error("Component is not defined");
            return null;
        }

        return <Component {...props}/>;
    };
}

export default withAuth;
