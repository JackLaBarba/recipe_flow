import { useEffect} from "react";
import { useNavigate } from "react-router-dom"


export default function NewRecipePage({ user_token }) {
    let navigate = useNavigate();

    useEffect(() => {
        const verifyUserToken = async (user_token) => {
            if (user_token !== null) {
                const data = await fetch('http://localhost:4000/verify_token', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ token: user_token })
                });
                return data.status === 200;
            }
            return false;
        }
        return verifyUserToken(user_token).then((verified) => {
            if (!verified) {
                navigate("/login");            
            }
        });

    }, [user_token, navigate]);

    return <div>here's the place where you'd be able to create a new recipe</div>
}