import { redirect } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Root() {
  return (
    <div>
      <Link to="/login">
        <h1>Link</h1>
      </Link>
    </div>
  );
}

export async function loader() {
  return redirect("/login");
}

export async function action() {
  return null;
}
