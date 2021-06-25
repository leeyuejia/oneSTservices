import React from 'react';
import { MDBContainer, MDBBtn, MDBIcon } from 'mdbreact';
import { useHistory } from 'react-router';


function Mainmenu(props) {
    const history = useHistory()
    const navTo = (e,destination) => {
        e.preventDefault()
        history.push(`/${destination}`)
    }

    return (
        <MDBContainer className="container p-3 d-flex flex-row justify-content-around">
            <MDBBtn 
                onClick={(e) => navTo(e,"uenValidator")}>
                    <MDBIcon fas icon="check-double mr-2"/>
                    uenValidator
            </MDBBtn>
            <MDBBtn 
                onClick={(e) => navTo(e,"weatherForecast")}>
                    <MDBIcon fas icon="cloud-moon-rain mr-2"/>
                    Weather Forecast
            </MDBBtn>
        </MDBContainer>
    );
}

export default Mainmenu;