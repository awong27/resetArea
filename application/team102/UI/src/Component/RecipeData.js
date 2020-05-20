import React, { useState } from 'react';
import {
    Row, Col, Button, ButtonGroup, Collapse, NavLink,
    Card, CardImg, CardText, CardTitle, CardImgOverlay,
    Modal, ModalHeader, ModalBody, ModalFooter, CardBody,
} from 'reactstrap';

import "./boxTabs.css"
//grabs recipe information
//displays as a rectangular picture with overlay text
//when clicked with have a pop up with more info
const RecipeData = props => {
    const { className } = props;
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [pop, setPop] = useState(false);
    const toggle2 = () => setPop(!pop);

    var mealplan = "/mealplan/" + props.username + "/" + props.password;
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
                    <Row style={{ boxShadow: "0px -2px rgba(36, 177, 153, 0.514)", height: "7.5px" }} />
                    <h3>Ingredients</h3>
                    {props.food.ingredients.map(item => { return (<h5>{item}</h5>); })}
                    
                </ModalBody>
                <ModalFooter>
                <Collapse isOpen={pop}>
                        <Row className="repdeck"><Card>
                            <Col><NavLink href={mealplan}><CardBody addItems={props.food, 'Sunday', 'Breakfast'}>Sun/Bre</CardBody></NavLink></Col>
                            <Col><NavLink href={mealplan}><CardBody addItems={props.food, 'Sunday', 'Lunch'}>Sun/Lun</CardBody></NavLink></Col>
                            <Col><NavLink href={mealplan}><CardBody addItems={props.food, 'Sunday', 'Dinner'}>Sun/Din</CardBody></NavLink></Col>
                        </Card></Row>
                        <Row className="repdeck"><Card>
                            <Col><NavLink href={mealplan}><CardBody addItems={props.food, 'Monday', 'Breakfast'}>Mon/Bre</CardBody></NavLink></Col>
                            <Col><NavLink href={mealplan}><CardBody addItems={props.food, 'Monday', 'Lunch'}>Mon/Lun</CardBody></NavLink></Col>
                            <Col><NavLink href={mealplan}><CardBody addItems={props.food, 'Monday', 'Dinner'}>Mon/Din</CardBody></NavLink></Col>
                        </Card></Row>
                        <Row className="repdeck"><Card>
                            <Col><NavLink href={mealplan}><CardBody addItems={props.food, 'Tuesday', 'Breakfast'}>Tue/Bre</CardBody></NavLink></Col>
                            <Col><NavLink href={mealplan}><CardBody addItems={props.food, 'Tuesday', 'Lunch'}>Tue/Lun</CardBody></NavLink></Col>
                            <Col><NavLink href={mealplan}><CardBody addItems={props.food, 'Tuesday', 'Dinner'}>Tue/Din</CardBody></NavLink></Col>
                        </Card></Row>
                        <Row className="repdeck"><Card>
                            <Col><NavLink href={mealplan}><CardBody addItems={props.food, 'Wednesday', 'Breakfast'}>Wed/Bre</CardBody></NavLink></Col>
                            <Col><NavLink href={mealplan}><CardBody addItems={props.food, 'Wednesday', 'Lunch'}>Wed/Lun</CardBody></NavLink></Col>
                            <Col><NavLink href={mealplan}><CardBody addItems={props.food, 'Wednesday', 'Dinner'}>Wed/Din</CardBody></NavLink></Col>
                        </Card></Row>
                        <Row className="repdeck"><Card>
                            <Col><NavLink href={mealplan}><CardBody addItems={props.food, 'Thursday', 'Breakfast'}>Thu/Bre</CardBody></NavLink></Col>
                            <Col><NavLink href={mealplan}><CardBody addItems={props.food, 'Thursday', 'Lunch'}>Thu/Lun</CardBody></NavLink></Col>
                            <Col><NavLink href={mealplan}><CardBody addItems={props.food, 'Thursday', 'Dinner'}>Thu/Din</CardBody></NavLink></Col>
                        </Card></Row>
                        <Row className="repdeck"><Card>
                            <Col><NavLink href={mealplan}><CardBody addItems={props.food, 'Friday', 'Breakfast'}>Fri/Bre</CardBody></NavLink></Col>
                            <Col><NavLink href={mealplan}><CardBody addItems={props.food, 'Friday', 'Lunch'}>Fri/Lun</CardBody></NavLink></Col>
                            <Col><NavLink href={mealplan}><CardBody addItems={props.food, 'Friday', 'Dinner'}>Fri/Din</CardBody></NavLink></Col>
                        </Card></Row>
                        <Row className="repdeck"><Card>
                            <Col><NavLink href={mealplan}><CardBody addItems={props.food, 'Saturday', 'Breakfast'}>Sat/Bre</CardBody></NavLink></Col>
                            <Col><NavLink href={mealplan}><CardBody addItems={props.food, 'Saturday', 'Lunch'}>Sat/Lun</CardBody></NavLink></Col>
                            <Col><NavLink href={mealplan}><CardBody addItems={props.food, 'Saturday', 'Dinner'}>Sat/Din</CardBody></NavLink></Col>
                        </Card></Row>                        
                    </Collapse>
                    <ButtonGroup className="itemOptbtn">
                        <Button addRecipe={props.food}>
                            <CardText>Save</CardText>
                        </Button>
                        <Button onClick={toggle2} >
                            <CardText style={{ marginBottom: '0' }}> Add to Meal Plan </CardText>
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