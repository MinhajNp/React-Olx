import React, { useState, useContext } from 'react';
import Logo from '../../../assets/images/olx-logo.svg';
import './Signup.css';
import { useNavigate } from 'react-router-dom';
import { FirebaseContext } from '../../store/context';
import { toast } from "react-toastify";

export default function Signup() {
  const navigate = useNavigate(); // Correctly call useNavigate
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');

  const { firebase } = useContext(FirebaseContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !email || !number || !password) {
      toast('Please fill out all fields.');
      return;
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        // Update profile with the username
        return result.user.updateProfile({ displayName: username }).then(() => result);
      })
      .then((result) => {
        // Add user details to Firestore
        return firebase.firestore().collection('users').add({
          id: result.user.uid,
          username: username,
          phone: number,
        });
      })
      .then(() => {
        toast('User registered successfully!');
        navigate('/login'); // Redirect to login
      })
      .catch((error) => {
        toast.error(error.code.split('/')[1].split('-').join(" "));
        // alert(error.message);
      });
  };

  return (
    <div className="signupContainer">
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt="OLX Logo" />
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="username"
            name="username"
            placeholder="Enter your username"
          />
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            name="email"
            placeholder="Enter your email"
          />
          <br />
          <label htmlFor="phone">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            id="phone"
            name="phone"
            placeholder="Enter your phone number"
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            name="password"
            placeholder="Enter your password"
          />
          <br />
          <br />
          <button type="submit">Signup</button>
        </form>
        <a href="/login">Login</a>
      </div>
    </div>
  );
}
