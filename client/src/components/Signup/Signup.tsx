import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Input from "../../UI/Input/Input";
import "./Signup.css";
import { register } from "../../store/actions/authActions";
import RadioButton from "../../UI/Radio/Radio";

function Signup() {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedOption, setSelectedOption] = useState('patient');
  const dispatch = useDispatch();

  const signupSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, userName, email, password, selectedOption));
  };

  return (
    <form onSubmit={(e) => signupSubmitHandler(e)}>
      <Input
        changed={(event) => setName(event.target.value)}
        label="Name"
        value={name}
      />
      <Input
        changed={(event) => setUserName(event.target.value)}
        label="Username"
        value={userName}
      />
      <Input
        changed={(event) => setEmail(event.target.value)}
        label="Email Id"
        value={email}
      />
      <Input
        changed={(event) => setPassword(event.target.value)}
        label="Password"
        value={password}
      />
      <RadioButton selectedOption={selectedOption} setSelectedOption={setSelectedOption}></RadioButton>
      <button>Sign Up</button>
    </form>
  );
}

export default Signup;
