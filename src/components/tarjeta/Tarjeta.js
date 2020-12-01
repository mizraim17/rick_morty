import React from "react";
import { Card, Col } from "react-bootstrap";

import "./Tarjeta.scss";

const Tarjeta = ({ data }) => {
	return (
		<Col sm={12} lg={6} className="mb-3 " >
			<Card style={{ width: "18rem" }} className="tarjeta">
			<Card.Title >  {data.name}</Card.Title>
				
			
				<Card.Img variant="top" src={data.image} />
				<Card.Body>
					
					<Card.Text> <b>Genero:</b>  {data.gender}</Card.Text>
					<Card.Text> <b>Especie:</b>  {data.species}</Card.Text>
				</Card.Body>
			</Card>
		</Col>
	);
};

export default Tarjeta;
