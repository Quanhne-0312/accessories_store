import { routes } from "@/routes";
import { Link } from "react-router-dom";


function NotFound() {
    return (
        <div className="">
            <Link to={routes.home}>go back</Link>
        </div>
    );
}

export default NotFound;
