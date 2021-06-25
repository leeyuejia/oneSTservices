import React, { useEffect, useState } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard } from 'mdbreact';
import apis from '../../services/api';
import Axios from 'axios'
import Moment from 'react-moment';
import moment from 'moment';
import './style_module.css'
const https = require('https')

const api = Axios.create({
    withCredentials:false,
    httpsAgent: new https.Agent({
        rejectUnauthorized:false
    }),
    headers: {
        Accept : "application/json"
    }
})



function WeatherForecast(props) {
    const [locationList, setLocationList] = useState([])
    const [selectLoc, setSelectLoc] = useState('choose your location')
    const [result, setResult] = useState({})
    const [showResult, setShowResult] = useState(false)
    const [err,setErr] = useState(false)
    const [errMsg, setErrMsg] = useState("Ops! something went wrong in the forecast.")
    
    const url = "https://api.data.gov.sg/v1/environment/2-hour-weather-forecast"

    const fetchApi = async () => {
        
        try {
            const fetchData = await api.get(url)
            const result = await fetchData.data
            // const result = fetchData.data

            await setLocationList(result.area_metadata)
            console.log(typeof result.area_metadata)
            console.log(result.area_metadata.length)
            console.log(locationList)
        } catch (e) {
            console.log("something went wrong", e)
        }       
    }
    const submit = async e => {
        e.preventDefault()
        setShowResult(false)
        setErr(false)
        console.log(selectLoc)
        fetchForeCast()
    }
    const fetchForeCast = async e => {
        //https://api.data.gov.sg/v1/environment/2-hour-weather-forecast?date_time=2021-06-25T14%3A00%3A00
        try {
            const currDate = moment(new Date()).format('YYYY-MM-DDTHH:mm:ss') 
            const param = "date_time"
            const postUrl = `${url}?${param}=${currDate}`
            const fetchData = await api.get(postUrl)
            const fetchResult = await fetchData.data.items[0]
            console.log(fetchResult)
            const itemList = await fetchResult.forecasts
            console.log(itemList)
            const selResult = itemList.filter(each => each.area == selectLoc)
            console.log(selectLoc + " and ", selResult[0])
            if(selResult) {
                setResult(selResult[0])
                setErr(false)
                setShowResult(true)
            }
        } catch(e) {
            console.log("something went wrong", e)
            setErr(true)
            setShowResult(false)
        }
    }
    const selectChange = e => {
        e.preventDefault()
        console.log(e)
    }
    const handleLocationChange = (e)  =>{
        console.log(e.target.value)
        e.preventDefault()
        setSelectLoc(e.target.value)
    }


    useEffect(() => {
        fetchApi()
    },[])
    return (
        <MDBContainer className="container p-3 h-100 mt-4">
            <MDBRow>
                <MDBCol>
                <MDBCard className="p-3">
                    <form onSubmit = {submit} noValidate>
                        <p className="h5 text-center mb-4">Singapore 2hour weather forecast</p>
                        
                        <select className="browser-default custom-select" value={selectLoc} onChange={handleLocationChange} >
                            <option >Choose your option</option>
                            {locationList?
                            locationList.map( item => {
                                return <option value={item.name}>{item.name}</option>
                            })
                            :
                            <option value="invalid">No option available</option>
                            }
                        </select>
                        {err? 
                            <div className='invalid-Weather-container'>{errMsg}</div>
                            :
                            null
                            }
                        <div className="text-center">
                            {/* <MDBBtn color="info" onClick={this.back} color="primary">Back</MDBBtn> */}
                            <MDBBtn type="submit" className='float-right'>Forecast</MDBBtn>
                        </div>
                    </form>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
            {showResult? 
                <MDBCol className="p-3 h5 text-right">
                        Weather forecast at {result.area} for the next 2 hours is <br></br>{result.forecast}
                </MDBCol>
                :
                null
            }
        </MDBContainer>
    );
}

export default WeatherForecast;