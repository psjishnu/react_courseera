import React  ,{useState} from 'react'
import { Card, CardImg, CardText, CardBody,CardTitle ,Breadcrumb, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label , Button, BreadcrumbItem} from 'reactstrap';
import Comments from "./Comments";
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform } from 'react-animation-components';

function DishDetail (props1) {
    const[isModalOpen,isModalOpenfn] = useState(false);
    const initForm = {
        rating: "",
        author: "",
        comments:"",
        dishId : ""
    };
    const [form, setForm] = useState(initForm);
    function toggleModal(){
        isModalOpenfn(!isModalOpen);
    }
    if (props1.isLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props1.errMess) {
        return(
            <div className="container">
                <div className="row">            
                    <h4>{props1.errMess}</h4>
                </div>
            </div>
        );
    }
    


    const handleChange = (e) => {
        const { value, name } = e.target;
        const fieldValue = { ...form };

        // error handling needed

        fieldValue[name] = name === "email" ? value.toLowerCase() : value;

        setForm(fieldValue);
        e.preventDefault();
        
    };
    function RenderDish(props){
        console.log(props);
        props=props.dish;
    return(
        <div className="row">
        <div  className="col-12 col-md-5 m-1">
            <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
            <Card>
                <CardImg top src={baseUrl + props.image} alt={props.name} />
                <CardBody>
                    <CardTitle>{props.name}</CardTitle>
                    <CardText>{props.description}</CardText>
                </CardBody>
            </Card>
            </FadeTransform>      
         </div>
        <div  className="col-12 col-md-5 m-1">
        <Comments ip={props.dish} />
        </div>
      </div>

    );
    }
    function handleSubmit(){
        alert(form.rating,form.author,form.remember);
        props1.postComment(form.dishId,form.rating,form.author,form.comments);
    }
    function CommentForm(input){
        form.dishId=props1.dishId;
        return(
        <div>
        <Button outline onClick={toggleModal}><span className="fa fa-sign-in fa-lg"></span> Login</Button>


        <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Login</ModalHeader>
        <ModalBody>
        
        <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor="rating">rating</Label>
                    <Input type="text" value={form.rating} id="rating" name="rating"
                      onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="author">author</Label>
                    <Input type="text" value={form.author} id="author" name="author"
                        onChange={handleChange}  />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="comments">comments</Label>
                    <Input type="text" value={form.comments} id="comments" name="comments"
                        onChange={handleChange}  />
                </FormGroup>
                <FormGroup check>
                    <Label check>
                        <Input type="checkbox" name="remember" value={form.remember}
                        onChange={handleChange} />
                        Remember me
                    </Label>
                </FormGroup>
                <Button type="submit"  value={input.dishId} color="primary">Login</Button>
            </Form>
            
        </ModalBody>
    </Modal>
    </div>)
    }
    console.log(props1.postComment);

    return (
        <div className="container">
        <div className="row">
            <Breadcrumb>

                <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                <BreadcrumbItem active>{props1.dish.name}</BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
                <h3>{props1.dish.name}</h3>
                <hr />
            </div>                
        </div>
        <div className="row">
            <div className="col-12 col-md-5 m-1">
                <RenderDish dish={props1.dish} />
            </div>
            <div className="col-12 col-md-5 m-1">
                <Comments comments={props1.comments} postComment={props1.postComment}
        dishId={props1.dish.id} />
                <CommentForm dishId={props1.dishId} postComment={props1.postComment} />
            </div>
        </div>
        </div>
    );

}


export default DishDetail;
