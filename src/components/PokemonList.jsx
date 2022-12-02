import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import {
	Button,
	Dropdown,
	DropdownButton,
	Form,
	InputGroup,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PokemonCard from './PokemonCard';
import backgroundList from '../assets/img/backgroundList.jpg';

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
			<img src={backgroundList} alt="" className="background position-fixed" />
			<div className="title-container">
				<h1>Welcome {user.toUpperCase()} to my Pokedex</h1>
			</div>
			<div className="container">
				<InputGroup
					className="mb-3 position-relative top-0 start-50 translate-middle-x"
					style={{
						width: '70rem',
						zIndex: 5,
						height: '5rem',
						marginTop: '1rem',
					}}
				>
					<Form.Control
						placeholder="search pokemon for N° or Name"
						value={pokemonName}
						onChange={(e) => setPokemonName(e.target.value)}
						aria-label="Recipient's username"
						aria-describedby="basic-addon2"
						style={{ fontSize: '2rem' }}
					/>
					<Button
						variant="outline-dark"
						onClick={searchPokemon}
						style={{ background: 'white', color: 'black' }}
					>
						Search
					</Button>
					<Button
						variant="outline-secondary"
						onClick={() => setPage(page - 1)}
						style={{ background: 'white', color: 'black' }}
					>
						Last Page
					</Button>
					<Button
						variant="outline-secondary"
						onClick={() => setPage(page + 1)}
						style={{ background: 'white', color: 'black' }}
					>
						Next Page
					</Button>
					<DropdownButton
						variant="outline-secondary"
						title="Types"
						id="input-group-dropdown-2"
						align="end"
						onChange={filterType}
					>
						{types.map((type) => (
							<Dropdown.Item
								key={type.name}
								value={type.url}
								style={{ fontSize: '1.2rem' }}
							>
								{type.name}
							</Dropdown.Item>
						))}
					</DropdownButton>
				</InputGroup>
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
		</div>
	);
};

export default PokemonList;
