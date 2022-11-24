import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const PokemonCard = ({ url }) => {
	const [pokemon, setPokemon] = useState({});
	// const [color, setColor] = useState('');

	useEffect(() => {
		axios.get(url).then((res) => setPokemon(res.data));
	}, []);

	// const colorType = () => {
	// 	if (pokemon.types?.type.name === 'normal') {
	// 		setColor('#a4acaf');
	// 	} else if (pokemon.types?.type.name === 'bug') {
	// 		setColor('#729f3f');
	// 	} else if (pokemon.types?.type.name === 'dragon') {
	// 		setColor('#f16e57');
	// 	} else if (pokemon.types?.type.name === 'ice') {
	// 		setColor('#51c4e7');
	// 	} else if (pokemon.types?.type.name === 'electric') {
	// 		setColor('#eed535');
	// 	} else if (pokemon.types?.type.name === 'poison') {
	// 		setColor('#b97fc9');
	// 	} else if (pokemon.types?.type.name === 'fairy') {
	// 		setColor('#fdb9e9');
	// 	} else if (pokemon.types?.type.name === 'fire') {
	// 		setColor('#fd7d24');
	// 	} else if (pokemon.types?.type.name === 'ghost') {
	// 		setColor('#7b62a3');
	// 	} else if (pokemon.types?.type.name === 'ground') {
	// 		setColor('#ab9842');
	// 	} else if (pokemon.types?.type.name === 'psychic') {
	// 		setColor('#f366b9');
	// 	} else if (pokemon.types?.type.name === 'steel') {
	// 		setColor('#9eb7b8');
	// 	} else if (pokemon.types?.type.name === 'dark') {
	// 		setColor('#707070');
	// 	} else if (pokemon.types?.type.name === 'fighting') {
	// 		setColor('#d56723');
	// 	} else if (pokemon.types?.type.name === 'flying') {
	// 		setColor('#3dc7ef');
	// 	} else if (pokemon.types?.type.name === 'rock') {
	// 		setColor('#a38c21');
	// 	} else if (pokemon.types?.type.name === 'water') {
	// 		setColor('#4492c5');
	// 	} else {
	// 		setColor('white');
	// 	}
	// };

	// console.log(color);

	return (
		<Link to={`/pokemon/${pokemon.id}`} className="card-container">
			<img
				src={pokemon.sprites?.other['official-artwork'].front_default}
				alt=""
				className="img-pokemon"
			/>
			<div className="features-main">
				<div className="pokemon-features-1">
					<p>N.° {pokemon.id}</p>
					<p className="pokemon-name">
						{pokemon.name?.charAt(0).toUpperCase()}
						{pokemon.name?.slice(1)}
					</p>
				</div>
				<div className="pokemon-features-2">
					{pokemon.types?.map((type) => (
						<p
							className="types-p"
							key={type.type.name}
							// style={{ background: `${colorType}` }}
						>
							{type.type.name.toUpperCase()}
						</p>
					))}
				</div>
			</div>
		</Link>
	);
};

export default PokemonCard;
