import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const PokemonDetail = () => {
	const [pokemon, setPokemon] = useState({});

	const [features, setFeatures] = useState({});

	// const [newId, setNewId] = useState('');

	const { id } = useParams();

	useEffect(() => {
		axios
			.get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
			.then((res) => setPokemon(res.data));
		axios
			.get(`https://pokeapi.co/api/v2/pokemon-species/${id}/`)
			.then((res) => setFeatures(res.data));
	}, [id]);
	// const backId = () => {
	// 	setNewId(id - 1);
	// 	axios
	// 		.get(`https://pokeapi.co/api/v2/pokemon/${newId}/`)
	// 		.then((res) => setPokemon(res.data));
	// 	axios
	// 		.get(`https://pokeapi.co/api/v2/pokemon-species/${newId}/`)
	// 		.then((res) => setFeatures(res.data));
	// };

	// console.log(newId);

	const height = pokemon.height / 10;
	const kg = pokemon.weight / 10;

	return (
		<div className="detail-main-container">
			<div className="buttons-container">
				<div>
					<button className="button-back">back</button>
				</div>
				<div>
					<button className="button-next">next</button>
				</div>
			</div>
			<div className="pokemon-main-details">
				<h1 className="pokemon-name-detail">
					{pokemon.name} N°{pokemon.id}
				</h1>
				<div className="pokemon-details-main">
					<div className="pokemon-principal-features">
						<img
							src={pokemon.sprites?.other['official-artwork'].front_default}
							alt=""
							className="img-pokemon-detail"
						/>
						<p className="curios-detail">
							curios detail: {features.flavor_text_entries?.[61].flavor_text}
						</p>
					</div>
					<div>
						<div className="features-detail">
							<div className="details">
								<h4 className="subtitle">evolution past</h4>
								<p className="p-detail">
									{features.evolves_from_species?.name}
								</p>
							</div>
							<div className="details">
								<h4 className="subtitle">category</h4>
								<p className="p-detail"> {features.genera?.[3].genus}</p>
							</div>
							<div className="details">
								<h4 className="subtitle">height</h4>
								<p className="p-detail">{height}mts</p>
							</div>
							<div className="details">
								<h4 className="subtitle">weight</h4>
								<p className="p-detail">{kg}kg</p>
							</div>
						</div>
						<div className="final-details">
							<h3 className="types-details">types</h3>
							<div className="types-details-container">
								{pokemon.types?.map((type) => (
									<p className="p-types" key={type.type.name}>
										{type.type.name.toUpperCase()}
									</p>
								))}
							</div>
							<h4>Habitat</h4>
							<p className="p-detail">{features.habitat?.name}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PokemonDetail;
