import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changeName } from '../store/slices/name.slice';

const InputName = () => {
	const [userName, setUserName] = useState('');

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const enter = () => {
		dispatch(changeName(userName));
		navigate('/pokemon');
	};

	return (
		<div>
			<img src="../../images/background.jpg" alt="" className="background" />
			<h1 className="welcome">Welcome</h1>
			<div className="login-box">
				<h2 className="title">Login</h2>
				<div class="user-box">
					<input
						type="text"
						onChange={(e) => setUserName(e.target.value)}
						value={userName}
						placeholder="enter your nickname"
						className="input-user"
					/>
				</div>
				<button onClick={enter} className="button">
					<i className="fa-solid fa-right-long"></i>
				</button>
			</div>
		</div>
	);
};

export default InputName;
