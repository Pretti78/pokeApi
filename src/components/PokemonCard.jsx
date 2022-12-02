import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Card, Col, ListGroup, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import BGpokemon from '../assets/img/pokemonbackground.jpg';

const PokemonCard = ({ url }) => {
	const [pokemon, setPokemon] = useState({});

	useEffect(() => {
		axios.get(url).then((res) => setPokemon(res.data));
	}, []);

	const colorType = (colorBg) => {
		if (colorBg === 'normal') {
			colorBg = '#a4acaf';
		} else if (colorBg === 'bug') {
			colorBg = '#729f3f';
		} else if (colorBg === 'grass') {
			colorBg = '#9bcc50';
		} else if (colorBg === 'dragon') {
			colorBg = '#f16e57';
		} else if (colorBg === 'ice') {
			colorBg = '#51c4e7';
		} else if (colorBg === 'electric') {
			colorBg = '#eed535';
		} else if (colorBg === 'poison') {
			colorBg = '#b97fc9';
		} else if (colorBg === 'fairy') {
			colorBg = '#fdb9e9';
		} else if (colorBg === 'fire') {
			colorBg = '#fd7d24';
		} else if (colorBg === 'ghost') {
			colorBg = '#7b62a3';
		} else if (colorBg === 'ground') {
			colorBg = '#ab9842';
		} else if (colorBg === 'psychic') {
			colorBg = '#f366b9';
		} else if (colorBg === 'steel') {
			colorBg = '#9eb7b8';
		} else if (colorBg === 'dark') {
			colorBg = '#707070';
		} else if (colorBg === 'fighting') {
			colorBg = '#d56723';
		} else if (colorBg === 'flying') {
			colorBg = '#3dc7ef';
		} else if (colorBg === 'rock') {
			colorBg = '#a38c21';
		} else if (colorBg === 'water') {
			colorBg = '#4492c5';
		} else {
			colorBg = '#fffe64';
		}
		return colorBg;
	};

	const backgroundImagePoke = pokemon.types?.map((type) =>
		colorType(type.type.name)
	);

	return (
		<Link to={`/pokemon/${pokemon.id}`} className="card-container">
			<Card
				style={{
					width: '25rem',
					boxShadow: `0px 0px 50px 0px ${backgroundImagePoke?.[0]} inset`,
					WebkitBoxShadow: `0px 0px 50px 0px ${backgroundImagePoke?.[0]} inset`,
					// background: `url(${BGpokemon})`,
				}}
			>
				<Card.Img
					variant="top"
					src={pokemon.sprites?.other['official-artwork'].front_default}
					style={{
						// boxShadow: `0px 0px 50px 0px ${backgroundImagePoke?.[0]} inset`,
						// WebkitBoxShadow: `0px 0px 50px 0px ${backgroundImagePoke?.[0]} inset`,
						borderRadius: 0,
					}}
				/>
				<Card.Body>
					<Card.Title
						style={{
							fontSize: '3rem',
						}}
					>
						{pokemon.name?.charAt(0).toUpperCase()}
						{pokemon.name?.slice(1)}
					</Card.Title>
					<Card.Text>N.° {pokemon.id}</Card.Text>
				</Card.Body>
				<ListGroup className="list-group-flush">
					<ListGroup.Item>
						<Row className="position-relative">
							{pokemon.types?.map((type) => (
								<Col key={type.type.name} className="text-center">
									<p
										className="types-p"
										style={{
											background: colorType(type.type.name),
											borderRadius: '0.7rem',
										}}
									>
										{type.type.name.toUpperCase()}
									</p>
								</Col>
							))}
						</Row>
					</ListGroup.Item>
				</ListGroup>
			</Card>
		</Link>
	);
};

export default PokemonCard;
