import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,  CardTitle } from 'reactstrap';

class DishDetail extends Component{
    
    RenderDish(dish) {
        return(
            <div className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg src={this.props.dish.image} alt={this.props.dish.name} />
                    <CardBody>
                        <CardTitle>{this.props.dish.name}</CardTitle>
                        <CardText>{this.props.dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }    
    RenderComments(comments){
        // console.log(comments)
        if (comments != null)
         {

            const commentListItems = comments.map((comment)=>{

                return(
                    <li key={comment.id} >
                            <p>{comment.comment}</p>
                            <p>--{comment.author}, {new Intl.DateTimeFormat('en-US',{year:'numeric', month:'short',day:'2-digit'}).format( new Date(Date.parse(comment.date)))}</p>
                    </li>

                );
            });

            return(
                    <div className="col-12 col-md-5 m-1">
                        <h4>Comments</h4>
                        <ul className="list-unstyled">
                            {commentListItems}
                        </ul>
                    </div>
            );
        }
        else{
            return(
                <div></div>
            );
        }
    };
    render(){
        if(this.props.dish != null){
            return(
                <div class="container">
                <div className="row">
                    {this.RenderDish(this.props.dish)}
                    {this.RenderComments(this.props.dish.comments)}
                </div>
                </div>
            );

        }
        else{
            return(<div></div>);
        }
       
    }
}    


  
export default DishDetail;