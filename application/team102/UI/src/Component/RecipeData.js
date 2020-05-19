import React, { useState} from 'react';
import {
    Row, Col, Button, ButtonGroup,
    Card, CardImg, CardText, CardTitle, CardImgOverlay,
    Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import MealPlan from './MealPlan';

//grabs recipe information
//displays as a rectangular picture with overlay text
//when clicked with have a pop up with more info
const RecipeData = props => {
    const { className } = props;
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    return (
        <Card className="bigdes" body inverse={true}>
            <CardImg alt="recipeItem" src={props.food.recipeImage} />
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}><h3>{props.food.recipeName}</h3></ModalHeader>
                <ModalBody>
                    <Row>
                        <Col>
                            <h5>Calories: {Math.round(props.food.recipeCalories)}</h5>
                            <h5>Carbs: {Math.round(props.food.recipeCarbs)} g</h5>
                            <h5>Protein: {Math.round(props.food.recipeProtein)} g</h5>
                            <h5>Fat: {Math.round(props.food.recipeFat)} g</h5>
                            <h5>Sugar: {Math.round(props.food.recipeSugar)} g</h5>
                            <h5>Sodium: {Math.round(props.food.recipeSodium)} mg</h5>
                        </Col>
                        <img alt={props.food.recipeName} src={props.food.recipeImage} height="35%" width="50%" style={{ borderRadius: "30px" }} />
                    </Row>                    
                    <Row style={{boxShadow: "0px -2px rgba(36, 177, 153, 0.514)", height: "7.5px"}}/>
                    <h3>Ingredients</h3>
                    {props.food.ingredients.map(item => { return (<h5>{item}</h5>); })}
                </ModalBody>
                <ModalFooter>
                    <ButtonGroup className="itemOptbtn">
                        <Button onClick={() => {props.addRecipe(props.food);}}>
                            <CardText>Save</CardText>
                        </Button>                        
                        <Button onClick={<MealPlan props={props.food}/>}>
                            <CardText>Add to Meal Plan</CardText>
                        </Button>
                        
                    </ButtonGroup>
                </ModalFooter>
            </Modal>
            <CardImgOverlay onClick={toggle} style={{ backgroundColor: "rgba(0, 0, 0, 0.375)" }}>
                <CardTitle position='fixed'><h4>{props.food.recipeName}</h4></CardTitle>
                <CardText>Calories: {props.food.recipeCalories > 0 ? Math.round(props.food.recipeCalories) : 0}</CardText>
            </CardImgOverlay>
        </Card>
    );
}
export default RecipeData;