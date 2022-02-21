import { useEffect} from "react";
import { useNavigate } from "react-router-dom"
import NewRecipe from "../components/NewRecipe";
import Config from "../config";


export default function NewRecipePage({ user_token }) {
    let navigate = useNavigate();

    useEffect(() => {
        const verifyUserToken = async (user_token) => {
            if (user_token !== null) {
                const data = await fetch(`${Config.auth_service_url}/verify_token`, {
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

    return <NewRecipe></NewRecipe>
}