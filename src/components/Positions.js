import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../Login.css";
import FooterComponent from './FooterComponent';
import PositionList from './PositionList';
import ResidentNavbar from './ResidentNavbar';
const Positions = () => {
const [data,setData]=useState({
    name:"",
    start_date:"",
    candidate_1:"",
    candidate_2:""
})
const [positionList,setPositionList]=useState([]);
const changeHandler=(event)=>{
    const {name,value}=event.target;
    setData({...data,[name]:value})
}
const navigate=useNavigate();
const positionHandler=async(e)=>{
e.preventDefault();
try {
    // let arr={
    //     position:data.name,
    //     electionStartDate:data.start_date,
    //     candidate:[
    //         {
    //             candidateName:data.candidate_1
    //         },
    //         {
    //             candidateName:data.candidate_2
    //         }
    //     ]
    // }
    const response=await axios.post(`/election/position/`,{
      position:data.name,
      electionStartDate:data.start_date,
      candidates:[
          {
              candidateName:data.candidate_1
          },
          {
              candidateName:data.candidate_2
          }
      ]
    })
    if(response.status===201){
        toast.success("Position Created", {
            position: toast.POSITION.TOP_LEFT
          });
          getAllPositions()
          setData({name:"",
        start_date:"",
        candidate_1:"",
        candidate_2:""})
    }
} catch (error) {
  toast.error(error.response.data.message, {
    position: toast.POSITION.TOP_LEFT
  }); 
}
}
 // fetch position list
 const getAllPositions=async()=>{
   
    try {
        const response=await axios.get(`/election/positions`)
        if(response){
          setPositionList(response.data);
        }
    } catch (error) {
        console.log(error);
    }
}
let checkrole=localStorage.getItem("role")

useEffect(()=>{
if(checkrole !=='committeemember'){
  navigate('/votecasting')
}
},[checkrole])
  return (
    <div>

      {/* navbar  */}
    <div className="ResidentNavbar">
      <ResidentNavbar />
    </div>


    <div className="position-container" >
    <ToastContainer />
    {/* create Position code  */}
    <h1 className="committeeHome-h3" >All Positions</h1>
    <div className='new-position-btn'>
    <button type="button" className="btn btn-primary mb-3 " data-bs-toggle="modal" data-bs-target="#newposition">
   New Position
</button>
    </div>
 {/* end create position code  */}

<div className="modal fade" id="newposition" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="staticBackdropLabel">Create New Position</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <Box
      component="form"
    //   sx={{
    //     '& .MuiTextField-root': { m: 1, width: '25ch' },
    //   }}
      noValidate
      autoComplete="off"
    >
      <div>
      <TextField
          required
          id="outlined-required"
          label="Position Name:"
          type='text'
          value={data.name}
          onChange={changeHandler}
          name='name'
          fullWidth
           style={{marginBottom:"10px"}}
          placeholder='Enter Position Name'
          
        />
      <TextField
          required
          id="outlined-required"
          // label="Election Start Date:"
          type='date'
          value={data.start_date}
          onChange={changeHandler}
          name='start_date'
          fullWidth
        style={{marginBottom:"10px"}}
          placeholder='Enter Election Start Date'
          
        />
      <TextField
          required
          id="outlined-required"
          label="Candidate 1:"
          type='text'
          value={data.candidate_1}
          onChange={changeHandler}
          name='candidate_1'
          fullWidth
        style={{marginBottom:"10px"}}
          placeholder='Enter Candidate Name'
          
        />
      <TextField
          required
          id="outlined-required"
          label="Candidate 2:"
          value={data.candidate_2}
          onChange={changeHandler}
          name='candidate_2'
          type='text'
          fullWidth
          style={{marginBottom:"10px"}}
          placeholder='Enter Candidate Name'
          
        />
      </div>
      </Box>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">cancel</button>
        <button type="button" className="btn btn-primary" onClick={positionHandler} data-bs-dismiss="modal">Submit Position</button>
      </div>
    </div>
  </div>
</div>


    </div>
    <PositionList getAllPositions={getAllPositions} positionList={positionList} />
    <div className='voting-footer'>

<FooterComponent />
</div>
  </div>
  )
}

export default Positions