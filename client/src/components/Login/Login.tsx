import { useState } from "react";
import Input from "../../UI/Input/Input";
import "./Login.css";
import { useDispatch } from "react-redux";
import { login } from "../../store/actions/authActions";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const loginSubmitHandler = (event) => {
    event.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <form onSubmit={(event) => loginSubmitHandler(event)}>
      <Input
        changed={(event) => setEmail(event.target.value)}
        label="Email Id"
        value={email}
        type="text"
      />
      <Input
        changed={(event) => setPassword(event.target.value)}
        label="Password"
        value={password}
        type="password"
      />
      <button>Login</button>
    </form>
  );
}

export default Login;
