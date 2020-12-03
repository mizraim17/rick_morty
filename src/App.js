import React, { useState } from "react";

import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Container, Form, Button, Col, Toast } from "react-bootstrap";
import axios from "axios";
import Tarjeta from "./components/tarjeta/Tarjeta";

function App() {
	const [dataCharacter, setDataCharacter] = useState(null);
	const [numberCharacter, setNumberCharacter] = useState(null);
	const [errBut, setError] = useState(null);

	const randomCaracter = () => {
		if (numberCharacter == null) {
			setError(true);
		}

		let aleatorio = "";
		for (let i = 1; i <= numberCharacter; i++) {
		
			i === (parseInt(numberCharacter)) 
				? (aleatorio = aleatorio + Math.round(Math.random() * (1 - 671) + 671))
				: (aleatorio =
						aleatorio + Math.round(Math.random() * (1 - 671) + 671) + ",");

			if (i === parseInt(numberCharacter))  {
				axios
					.get(`https://rickandmortyapi.com/api/character/${aleatorio}`)
					.then((res) => {
						setDataCharacter(res.data);
						// console.log("=>", res.data);
					});
			}
		}
	};

	const radioChanges = (e) => {
		setNumberCharacter(e.target.value);
		setError(null);
	};

	return (
		<div className="App">		
			<Container>
				<Row className="">
					<Col sm={12}>
						<figure>
							<img className="img-title img-fluid" src="./images/title_rick_morty.png" alt=""/>
						</figure>
					</Col>
				</Row>
				<Row className="mb-3">
					<Col sm={6} className="mb-3">
						<Form.Label as="legend" bg="primary" column>
							Elige cuantos mortys quieres ver
						</Form.Label>
					</Col>
					<Col sm={6}>
						<Form.Check
							onChange={radioChanges}
							type="radio"
							label="10 personajes"
							name="formHorizontalRadios"
							id="formHorizontalRadios1"
							value="10"
						/>
						<Form.Check
							onChange={radioChanges}
							type="radio"
							label="15 personajes"
							name="formHorizontalRadios"
							id="formHorizontalRadios2"
							value="15"
						/>
						<Form.Check
							onChange={radioChanges}
							type="radio"
							label="20 personajes"
							name="formHorizontalRadios"
							id="formHorizontalRadios3"
							value="20"
						/>
					</Col>
				</Row>			 

				{errBut ? (
					<Toast>
						<Toast.Header>
							<img
								src="holder.js/20x20?text=%20"
								className="rounded mr-2"
								alt=""
							/>
							<strong className="mr-auto">Ups</strong>
							 
						</Toast.Header>
						<Toast.Body>No has elegido cuantos quieres</Toast.Body>
					</Toast>
				) : (
					""
				)}

				<Row>
					<Container>
						<div className="my-5">
							<Button onClick={randomCaracter}>Obtén Personaje</Button>
						</div>
					</Container>
				</Row>

				<Row>
					{dataCharacter != null
						? dataCharacter.map((el, i) => {
								return <Tarjeta data={el} key={i} />;
						  })
						: ""}
				</Row>
			</Container>
		</div>
	);
}

export default App;
