import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PokemonCard from './PokemonCard';

const PokemonList = () => {
	const [pokemonList, setPokemonList] = useState([]);

	const [pokemonName, setPokemonName] = useState('');

	const [types, setTypes] = useState([]);

	const user = useSelector((state) => state.name);
	const navigate = useNavigate();

	useEffect(() => {
		axios
			.get(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`)
			.then((res) => setPokemonList(res.data.results));
		axios
			.get('https://pokeapi.co/api/v2/type/')
			.then((res) => setTypes(res.data.results));
	}, []);

	const searchPokemon = () => {
		navigate(`/pokemon/${pokemonName.toLowerCase()}`);
	};

	const filterType = (e) => {
		const url = e.target.value;
		axios.get(url).then((res) => setPokemonList(res.data.pokemon));
	};

	const [page, setPage] = useState(1);
	const pokemonForPage = 20;
	const lastIndex = page * pokemonForPage;
	const firstIndex = lastIndex - pokemonForPage;
	const pagePokemon = pokemonList.slice(firstIndex, lastIndex);

	return (
		<div className="pokemon-list-main">
			<div className="title-container">
				<h1>Welcome {user.toUpperCase()} to my Pokedex</h1>
			</div>
			<div className="input-pokemon-main">
				<input
					type="text"
					placeholder="search pokemon for N° or Name"
					value={pokemonName}
					onChange={(e) => setPokemonName(e.target.value)}
					className="input-pokemon"
				/>
				<button onClick={searchPokemon} className="button-input-pokemon">
					search
				</button>
				<button
					onClick={() => setPage(page - 1)}
					className="button-input-pokemon"
				>
					last page
				</button>
				<button
					onClick={() => setPage(page + 1)}
					className="button-input-pokemon"
				>
					next page
				</button>
				<select onChange={filterType} className="select-type">
					{types.map((type) => (
						<option key={type.name} value={type.url}>
							{type.name}
						</option>
					))}
				</select>
			</div>
			<ul className="pokemon-list-container">
				{pagePokemon.map((pokemon) => (
					<li
						key={pokemon.pokemon?.url ? pokemon.pokemon?.url : pokemon.url}
						className="pokemon-card"
					>
						<PokemonCard
							url={pokemon.pokemon?.url ? pokemon.pokemon?.url : pokemon.url}
						/>
					</li>
				))}
			</ul>
		</div>
	);
};

export default PokemonList;
