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

	console.log("--->",`${process.env.REACT_APP_API_URL} `)
	console.log("--->",)

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
					.get(`${process.env.REACT_APP_API_URL}${aleatorio}`)
					.then((res) => {
						setDataCharacter(res.data);
						// console.log("=>", res.data);
					});
			}
		}
	};

	const selectChanges = (e) => {
		console.log("entro",e.target.value)
		setNumberCharacter(e.target.value);
		setError(null);
	};

	return (
		<div className="App">		
			<h1>as ={process.env.REACT_APP_SECRET_NAME}</h1>
			
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
						<Form>
							<Form.Group controlId="exampleForm.SelectCustom">
								<Form.Label>Custom select</Form.Label>
								<Form.Control as="select" custom  onChange={selectChanges}> 
									<option value="0" custom="true">elige valor</option>
									<option value="10">10</option>
									<option value="15" onChange={selectChanges}>15</option>
									<option value="20" onChange={selectChanges}>20</option>
									<option value="25" onChange={selectChanges}>25	</option>									
								</Form.Control>
							</Form.Group>
						</Form>
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
