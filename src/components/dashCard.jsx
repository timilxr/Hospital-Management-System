import React from 'react';
import { Link } from 'react-router-dom';
import {Card, Button, Row, Col} from 'react-bootstrap';

const DashCard = (props) => {
    return (
        <Card bg={props.message.bg} className='bg-gradient shadow-lg'>
            {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
            <Card.Body>
                <Row>
                    <Col>
                        <i className="fa fa-file-text fa-5x"></i>
                    </Col>
                    <Col>
                    <Card.Title>{props.message.content.length}</Card.Title>
                    <Card.Subtitle className="mb-2" style={{textTransform: 'capitalize'}}>{props.message.subtitle}</Card.Subtitle>
                    {/* <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                    </Card.Text> */}
                    </Col>
                </Row>
            </Card.Body>
            <Card.Footer>
                {/* <Card.Link href="#" className='mr-auto'>Card Link</Card.Link> */}
                <Card.Link href="#">
                    <Link to={props.message.route}>
                        <Button variant="primary" className='ms-5'>View</Button>
                    </Link>
                </Card.Link>
            </Card.Footer>
        </Card>
    )
}

export default DashCard;