import React, {useEffect, useState} from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard } from 'mdbreact';
import './style_module.css'



function UenValidator(props) {
    const [uen, setUen] = useState()
    const [uenErr, setUenErr] = useState(false)
    const [uenErrMsg, setUenErrMsg] = useState('')
    const [uenIsValid, setUenIsValid] = useState(false)


    const onChange = async e => {
        e.preventDefault()
        setUen(e.target.value)
    }
    const submit = async e => {
        e.preventDefault()
        await setUenErr(false)
        await setUenIsValid(false)
        if (!uen) {
            await setUenErrMsg("Please enter a valid UEN.")
            await setUenErr(true)
            console.log(uenErrMsg)
        } else if(uen) {
            await validateUen(uen)
        } else {
            alert("something is wrong")
        }

    }

    const validateUen = async input => {
        const entityType = ['LP', 'LL', 'FC', 'PF', 'RF', 'MQ', 'MM', 'NB', 'CC', 'CS', 'MB', 'FM', 'GS', 'GA',
                            'GB', 'DP', 'CP', 'NR', 'CM', 'CD', 'MD', 'HS', 'VH', 'CH', 'MH', 'CL', 'XL', 'CX',
                            'RP', 'TU', 'TC', 'FB', 'FN', 'PA', 'PB', 'SS', 'MC', 'SM'
        ];
        const entityMatch = true
        const inputCap = input.toUpperCase()
        const inputLength = input.length
        const inputArr = input.split('')
        const alptCheck =/^[a-zA-Z]+$/
        const startLetters = ["S", "T", "R"]

        // CHECK UEN STRING LENGTH
        if(inputCap.length < 9 || inputCap.length > 10) {
            await setUenErrMsg("UEN number must be between 9-10 characters.")
            await setUenErr(true)
            return
        }

        switch (inputLength) {
            case (9) :         // if character is 9, its businesses registered with ACRA EG. "12345678A"
                if(!alptCheck.test(inputArr[inputLength -1])) {
                    await setUenErrMsg("UEN last character must be an alphabet.")
                    await setUenErr(true)
                    console.log("UEN last digit must be a alphabet")
                    break;
                }else {
                    for (let i = 0; i < inputLength - 1; i++) {
                        if(isNaN(inputArr[i])){
                            await setUenErrMsg("All except the last character must be a number.")
                            await setUenErr(true)
                            console.log("All except the last character must be a number")
                            return
                        }
                    }
                    console.log("your uen in valid")
                    await setUenIsValid(true)
                    break
                } 
            case (10) :  
                 // if character is 10, its Local companies registered with ACRA or All other entities which will be issued new UEN       
                console.log("Local companies registered with ACRA")
                console.log("All other entities which will be issued new UEN")
                if(!alptCheck.test(inputCap[inputLength -1])) { // LAST CHARACTER MUST BE ALPHABET
                    await setUenErrMsg("UEN last character must be an alphabet.")
                    await setUenErr(true)
                    console.log("UEN last digit must be a alphabet")
                    break;
                }else {
                    // IF FIRST FOUR IS A NUMBER, its Local companies registered with ACRA EG. "198856789A"
                    if (!isNaN(inputArr[0]) && !isNaN(inputArr[1]) && 
                       !isNaN(inputArr[2]) && !isNaN(inputArr[3]) ) {
                        // 5TH - 9TH CHARACTER MUST BE A NUMBER
                            for (let i = 4; i < inputLength - 1; i++) {
                                if(isNaN(inputArr[i])) {
                                    await setUenErrMsg("If the first 4 character is a number, then the following 4 character must be a number.")
                                    await setUenErr(true)
                                    console.log("5th-9th character must be a number")
                                    return
                                }
                            }
                            console.log("your uen in valid")
                            await setUenIsValid(true)
                         break;
                    } else {
                    // IF FIRST FOUR CHARACTER IS NOT A NUMBER, Its All other entities which will be issued new UEN EG. "S09LP6789A"
                        // 1ST CHARACTER MUST BE AN ALPHABET
                        if (!startLetters.includes(inputArr[0])) {
                            await setUenErrMsg("If the first 4 character is not a number, then first letter must be a 'S' or 'T' or 'R'")
                            await setUenErr(true)
                            console.log("First letter must be 'S' or 'T' or 'R'")
                            break;
                        // 2ND AND 3RD CHARACTER MUST BE A NUMBER
                        }if (isNaN(inputArr[1]) || isNaN(inputArr[2])) {
                            await setUenErrMsg("If the first 4 character is not a number, 2nd and 3rd character must be a number")
                            await setUenErr(true)
                            console.log("if first character is a alphabet, 2nd and 3rd character must be a number")
                            break;
                        // 4TH - 5TH CHARACTER MUST BE AN ALPHABET
                        }if (!alptCheck.test(inputArr[3]) || !alptCheck.test(inputArr[4])) {
                            await setUenErrMsg("If the first 4 character is not a number, 4th and 5th character must be an alphabet")
                            await setUenErr(true)
                            console.log("if first character is a alphabet, 4th and 5th character must be an alphabet")
                            break;
                        }
                        const entityInput = (inputArr[3] + inputArr[4]).toUpperCase()
                        console.log(entityInput + typeof(entityInput))
                        if (!entityType.includes(entityInput)) {
                            await setUenErrMsg("You have key in an invalid entity-type")
                            await setUenErr(true)
                            console.log("invalid entity-type")
                            break
                        } else {
                            for (let i = 5; i < inputLength - 1; i++) {
                                if(isNaN(inputArr[i])) {
                                    await setUenErrMsg("If the first character is a alphabet, then the 5th to the 9th character must be a number.")
                                    await setUenErr(true)
                                    console.log("5th-9th character must be a number")
                                    return
                                }
                            }
                            console.log("your uen in valid")
                            await setUenIsValid(true)
                            break;
                        }
                    }
                }
            default:
                break;
        }
    }
    useEffect(()=> {
console.log(uen)
    },[uen])
    return (
        <MDBContainer className="container p-3 h-100 mt-4">
            <MDBRow>
                <MDBCol>
                <MDBCard className="p-3">
                    <form onSubmit = {submit} noValidate>
                        <p className="h5 text-center mb-4">UEN Validator</p>
                        
                        <div className="grey-text">
                            <MDBInput 
                                label="UEN number" 
                                icon="user" 
                                iconRegular
                                className={uenErr ? "is-invalid": uenIsValid? "is-valid":""}
                                group 
                                type="text" 
                                name="uen" 
                                onChange={onChange}
                                required >
                            {uenErr? 
                            <div className='invalid-container'>{uenErrMsg}</div>
                            :
                            null
                            }
                            </MDBInput>
                        </div>
                        <div className="text-center">
                            {/* <MDBBtn color="info" onClick={this.back} color="primary">Back</MDBBtn> */}
                            <MDBBtn type="submit" className='float-right'>validate</MDBBtn>
                        </div>
                    </form>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
            {uenIsValid? 
                <MDBCol className="p-3 h5 text-right">
                        Your input is a valid UEN number.
                </MDBCol>
                :
                null
            }
        </MDBContainer>
    );
}

export default UenValidator;