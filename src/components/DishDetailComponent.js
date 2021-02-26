import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Modal, ModalHeader, ModalBody, Button, Row, Col, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

    const RenderDish = ({dish}) => {
        return (
            <Card>
                <CardImg width= "100%" src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        )
    };

    const RenderComments = ({comments}) => {
        if (comments != null) {
            return (
                <ul>
                    {comments.map((comment)=>{
                        return(
                            <li key={comment.id} className="list-unstyled">
                                <p>{comment.comment}</p>
                                <p> -- {comment.author} ,
                                    {" "} {new Intl.DateTimeFormat("en-US", { year: "numeric", month: "short", day: "2-digit" }).format(new Date(Date.parse(comment.date)))}
                                </p>
                            </li>
                        )
                    })}
                </ul>
                ); 
        } else {
                return(
                    <div></div>
                );
            }
    };



    const maxLength = (len) => (val) => !(val) || (val.length <= len);
    const minLength = (len) => (val) => val && (val.length >= len);

    class CommentForm extends Component{

        constructor(props) {
            super(props);
            this.state = {
            isModalOpen: false
        };

            this.toggleModal = this.toggleModal.bind(this);
        }

        toggleModal() {
            this.setState({
            isModalOpen: !this.state.isModalOpen
            });
        }
        
        render() {
            return(
                <div>
                    <Button outline onClick={this.toggleModal} ><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>

                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                        <ModalBody>
                            <LocalForm inline>
                                <Row className="form-group">
                                    <Col>
                                        <Label htmlFor="rating">Rating</Label>
                                            <Control.select model=".rating" name="rating"
                                                className="form-control">
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                            </Control.select>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col>
                                        <Label htmlFor="name" >Your Name</Label>
                                        <Control.text model=".name" id="name" name="name"
                                            placeholder="Name"
                                            className="form-control"
                                            validators={{
                                            minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                        />
                                        <Errors
                                            className="text-danger"
                                            model=".name"
                                            show="touched"
                                            messages={{
                                                minLength: 'Must be greater than 3 characters',
                                                maxLength: 'Must be 15 characters or less'
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col>
                                        <Label htmlFor="message" >Comment</Label>
                                        <Control.textarea model=".message" id="message" name="message"
                                            rows="6"
                                            className="form-control" />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col>
                                        <Button type="submit" color="primary" onClick={this.toggleModal} > Submit </Button>
                                    </Col>
                                </Row>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
                </div>
            );
        }
    };

    
        
    
    const Dishdetail = (props) => {

        if (props.dish != null){
            return (
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr />
                        </div>                
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <RenderDish dish={props.dish} />
                        </div>



                        <div className="col-12 col-md-5 m-1">
                            <RenderComments comments={props.comments} />
                            <CommentForm />                              
                        </div>
                    </div>
                </div>
            );
        } else { return( <div></div> )}
    }



export default Dishdetail;