import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Row, Col } from 'react-bootstrap';

const DashCard = (props) => {
    return (
        <Card bg={props.message.bg} className='bg-gradient shadow-lg p-0'>
            {/* <Card.Img variant="top" src="" className="fa fa-file-text fa-5x text-center text-secondary" />
            <Card.ImgOverlay> */}
            <Card.Body className='text-center text-white'>
                <Row>
                    <Col className='p-0'>
                        <i className={`${props.message.icon} m-0 text-white`} aria-hidden={true}></i>
                    </Col>
                    <Col className='p-0 text-end'>
                        <Card.Title><h1>{props.message.content.length}</h1></Card.Title>
                        <Card.Subtitle className="mb-2" style={{ textTransform: 'capitalize' }}>{props.message.subtitle}</Card.Subtitle>
                        {/* <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                    </Card.Text> */}
                    </Col>
                </Row>
            </Card.Body>
            {/* </Card.ImgOverlay> */}
            <Card.Footer className='text-end mt-2'>
                {/* <Card.Link href="#" className='mr-auto'>Card Link</Card.Link> */}
                <Card.Link href="#">
                    <Link to={props.message.route}>
                        <Button variant="primary" size='sm' className='mt-2'>View</Button>
                    </Link>
                </Card.Link>
            </Card.Footer>
        </Card>
    )
}

export default DashCard;