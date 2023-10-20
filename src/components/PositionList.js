import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../Login.css";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(position, electionStartDate, electionEndDate, candidate1, candidate2) {
  return { position, electionStartDate, electionEndDate, candidate1, candidate2 };
}

const rows = [
  createData('Frozen yoghurt', '2023-08-21', '2023-08-22', 'test', 'test'),
  createData('Ice cream sandwich', '2023-08-21', '2023-08-22', 'test', 'test'),
  createData('Eclair', '2023-08-21','2023-08-22', 'test','test'),
  createData('Cupcake', '2023-08-21', '2023-08-22', 'test', 'test'),
  createData('Gingerbread', '2023-08-21', '2023-08-22', 'test', 'test'),
];

const  PositionList=({getAllPositions,positionList})=> {
    
    const [open, setOpen] = React.useState(false);
    const [positionId,setPositionId]=useState("")
    const [data,setData]=useState({
        name:"",
        start_date:"",
        candidate_1:"",
        candidate_2:""
    })

    const changeHandler=(event)=>{
        const {name,value}=event.target;
        setData({...data,[name]:value})
    }
    const handleClickOpen = (id) => {
      setOpen(true);
      setPositionId(id)
    };
  
    const handleClose = () => {
      setOpen(false);
    };
   


    // delete position handler 
    const deleteHandler=async()=>{
      setOpen(false);
        try {
          const response = await axios({
            method: 'delete',
            url: `/election/position/`,
            data: {
              position: positionId
            }
          });
            if(response.status===202){
                getAllPositions();
                setPositionId("")
               
                toast.success("Position Deleted", {
                    position: toast.POSITION.TOP_LEFT
                  });
            }
        } catch (error) {
            setOpen(false);
            toast.error(error.response.data.message, {
              position: toast.POSITION.TOP_LEFT
            }); 
        }
    }
    function formatDate(dateStr) {
      const date = new Date(dateStr);

      const year = date.getFullYear().toString().substr(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
      
      return `${day}-${month}-${year}`;
    }

    // get single position for edit 
    const editPositionHandler=(alldata)=>{
        setData({
            ...data,
            name:alldata?.position,
            start_date:alldata?.electionStartDate,
            candidate_1:alldata?.candidate1,
            candidate_2:alldata?.candidate2
            
        })
    }

    // update position 
    const updatePositionHandler=async()=>{
        try {
            const response=await axios.put(`/election/position/`,{
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
            if(response.status===200){
        getAllPositions();
        setData({name:"",
        start_date:"",
        candidate_1:"",
        candidate_2:""})
                toast.success("Position Updated", {
                    position: toast.POSITION.TOP_LEFT
                  });
            }
        } catch (error) {
          toast.error(error.response.data.message, {
            position: toast.POSITION.TOP_LEFT
          }); 
        }
    }
    useEffect(()=>{
        getAllPositions();
    },[])
  return (
    <>
       <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Delete Position
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
          Are You Sure to Delete Position?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={deleteHandler}>Delete</Button>
        </DialogActions>
      </Dialog>
    
    <TableContainer component={Paper}>
      <Table className='vote-casting-table' aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Position Name</StyledTableCell>
            <StyledTableCell align="right">Election Start Date</StyledTableCell>
            <StyledTableCell align="right" className='vote-casting-mobile'>Election End Date</StyledTableCell>
            <StyledTableCell align="right">Candidate 1</StyledTableCell>
            <StyledTableCell align="right">Candidate 2</StyledTableCell>
            <StyledTableCell align="right">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {positionList?.map((row) => (
            <StyledTableRow key={row.position}>
              <StyledTableCell component="th" scope="row">
                {row.position}
              </StyledTableCell>
              <StyledTableCell align="right">{formatDate(row.electionStartDate)}</StyledTableCell>
              <StyledTableCell align="right" className='vote-casting-mobile'>{formatDate(row.electionEndDate)}</StyledTableCell>
              <StyledTableCell align="right">{row.candidate1}</StyledTableCell>
              <StyledTableCell align="right">{row.candidate2}</StyledTableCell>
              <StyledTableCell align="right"><DeleteIcon onClick={()=>{
                handleClickOpen(row.position)
                }} style={{color:"red"}} /> <EditIcon onClick={()=>editPositionHandler(row)}  data-bs-toggle="modal" data-bs-target="#editposition" /></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    <ToastContainer />



{/* edit position modal  */}

<div className="modal fade" id="editposition" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="staticBackdropLabel">Edit Position</h1>
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
          label="Election Start Date:"
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
        <button type="button" className="btn btn-primary" onClick={updatePositionHandler} data-bs-dismiss="modal">Update Position</button>
      </div>
    </div>
  </div>
</div>
    </TableContainer>
    </>
  );
}

export default PositionList