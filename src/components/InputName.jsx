import React from 'react';
import { useState } from 'react';
import { Button, Card, Form, InputGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changeName } from '../store/slices/name.slice';
import background from '../assets/img/background.jpg';

const InputName = () => {
	const [userName, setUserName] = useState('');

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const enter = () => {
		dispatch(changeName(userName));
		navigate('/pokemon');
	};

	return (
		<>
			<img src={background} alt="" className="background position-absolute" />
			<Card
				className="position-absolute top-50 start-50 translate-middle"
				style={{
					width: '35rem',
					height: '10rem',
					padding: '2.5rem',
				}}
			>
				<Card.Body>
					<InputGroup className="mb-3">
						<h1
							className="title"
							style={{ fontSize: '2.5rem', margin: '0.5rem' }}
						>
							Login
						</h1>
						<Form.Control
							onChange={(e) => setUserName(e.target.value)}
							value={userName}
							placeholder="Enter your nickname"
							aria-label="Enter your nickname"
							aria-describedby="basic-addon2"
							style={{ fontSize: '2rem' }}
						/>
						<Button
							variant="outline-secondary"
							id="button-addon2"
							onClick={enter}
							className="btn btn-primary"
						>
							<i className="fa-solid fa-right-long"></i>
						</Button>
					</InputGroup>
				</Card.Body>
			</Card>
		</>
	);
};

export default InputName;
