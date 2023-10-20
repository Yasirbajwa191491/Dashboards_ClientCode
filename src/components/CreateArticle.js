import EditIcon from '@mui/icons-material/Edit';
import Textarea from '@mui/joy/Textarea';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Bulletin.css';
import FooterComponent from './FooterComponent';
import ResidentNavbar from "./ResidentNavbar";

<div></div>

function createData(articleId, title, description, addedBy, date) {
  return { articleId, title, description, addedBy, date };
}

const rows = [
  createData(1, 'title 1', 'test', 'yasir@gmail.com', '22-08-2023'),
  createData(2, 'title 2', 'test 1', 'yasir@gmail.com', '22-08-2023'),
  createData(3, 'title 3','test 2', 'yasir@gmail.com','22-08-2023'),
  createData(4, 'title 3','test 2', 'yasir@gmail.com','22-08-2023'),
  createData(5, 'title 3','test 2', 'yasir@gmail.com','22-08-2023'),
  createData(6, 'title 3','test 2', 'yasir@gmail.com','22-08-2023'),
  createData(7, 'title 3','test 2', 'yasir@gmail.com','22-08-2023'),
  createData(8, 'title 3','test 2', 'yasir@gmail.com','22-08-2023'),
  createData(9, 'title 3','test 2', 'yasir@gmail.com','22-08-2023'),
  createData(9, 'title 10','test 2', 'yasir@gmail.com','22-08-2023'),
  createData(9, 'title 11','test 2', 'yasir@gmail.com','22-08-2023'),
  createData(9, 'title 12','test 2', 'yasir@gmail.com','22-08-2023'),
  createData(9, 'title 13','test 2', 'yasir@gmail.com','22-08-2023'),
];
export const CreateArticle = () => {
  const [data,setData]=useState({
    title:"",
    description:"",
    addedBy:"",
    date:""
})

const [articleId,setArticleId]=useState("")
   const [articleList,setArticleList]=useState([])
    const changeHandler=(event)=>{
        const {name,value}=event.target;
        setData({...data,[name]:value})
    }

    const createArticleHandler=async()=>{
        try {
            const {title,description,addedBy}=data
            const response=await axios.post(`/article`,{
                title,description,addedBy
            })
            if(response.status===201){
              setData({...data,
                title:"",
        description:"",
        addedBy:"",
        date:""
              })
                toast.success("New Notice Created", {
                    position: toast.POSITION.TOP_LEFT
                  }); 

            }
            allarticleList();
        } catch (error) {
          toast.error(error.response.data.message, {
            position: toast.POSITION.TOP_LEFT
          }); 
        }
    }
    //    all article list 
    const allarticleList=async()=>{
        try {
            const response=await axios.get(`/article`)
            if(response.status===200){
                setArticleList(response.data)
            }
        } catch (error) {
            console.log(error);
        }
    }
let checkrole=localStorage.getItem("role")

    useEffect(()=>{
        allarticleList();
    },[])
 
    function formatDate(dateStr) {
      const date = new Date(dateStr);

      const year = date.getFullYear().toString().substr(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
      
      return `${day}-${month}-${year}`;
    }

  const updateArticleHandler=async()=>{
      try {
          const {addedBy,title,description,date}=data
          const response=await axios.put(`/article/${articleId}`,{
              addedBy,title,description,date
          })
          if(response.status===200){
            setData({...data,
              title:"",
      description:"",
      addedBy:"",
      date:""
            })
              setArticleId("")
              allarticleList();
              toast.success("Notice Updated", {
                  position: toast.POSITION.TOP_LEFT
                });            }
      } catch (error) {
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_LEFT
        }); 
      }
  }

  // single article list 
  const editPositionHandler=async(id)=>{
 try {
  const response=await axios.get(`/article/${id}`)
  if(response.status===200){
      setData({...data,
      date:response.data?.date,
      title:response.data?.title,
      description:response.data?.description,
      addedBy:response.data?.addedBy
      })
      setArticleId(response.data?.articleId)
  }
 }catch(error){
  console.log(error);
 }
  }
 

  return (
    <div >
      {/* navbar  */}
    <div className="ResidentNavbar" >
      <ResidentNavbar /> 
    </div>
    
     
     {/* for displaying cards  */}
     <div className="article-container" >
     <h1 className="bulletindash-h3" >Notices List</h1>

     {  checkrole==="committeemember"&&  <button type="button" className="btn btn-primary new-notice-btn" data-bs-toggle="modal" data-bs-target="#addarticle">
   New Notice
</button> }

      <div className="form-container-article " >
        {articleList?.map((row, index) => (
          <div key={index} className="articlebox">
          <p style={{textAlign:"center"}} className='radio-label'>Date: {formatDate(row.date)}</p>
            <h3 className='article-btn text-center'>{row.title}</h3>
            <p className='radio-label'>{row.description}</p>
            <hr />
            <p className='radio-label' style={{textAlign:"start"}}>Added By: {row.addedBy}</p>
            {
                  checkrole==="committeemember"&& <p onClick={()=>editPositionHandler(row.articleId)} style={{cursor:"pointer"}}><EditIcon onClick={()=>editPositionHandler(row.articleId)} data-bs-toggle="modal" data-bs-target="#editarticle"  ></EditIcon><span onClick={()=>editPositionHandler(row.articleId)} data-bs-toggle="modal" data-bs-target="#editarticle">Edit</span></p> 
            }
          </div>
        ))}
      </div>
     
    </div>
     <div>
      

    

{/* create notice modal  */}

<div className="modal fade" id="addarticle" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="staticBackdropLabel">Create Notice</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <div  style={{display:'flex',justifyContent:'center',alignContent:'center'}}>
      {  checkrole==="committeemember"&& 
        <div>
        <h3 className="committeeHome-h3" style={{color:"darkgray"}}>New Notice</h3>
      
                   <div >
    
    <ToastContainer />
      <TextField
          required
          id="outlined-required"
          label="Title:"
          type='text'
          value={data.title}
          onChange={changeHandler}
          name='title'
          fullWidth
           style={{marginBottom:"10px"}}
          placeholder='Enter Title'
          
        />
     
      <TextField
          required
          id="outlined-required"
          label="Added By:"
          type='text'
          value={data.addedBy}
          onChange={changeHandler}
          name='addedBy'
          fullWidth
        style={{marginBottom:"10px"}}
          placeholder='Added By'
          
        />
   
        <Textarea
         placeholder="Enter Description"
         label="Description"
         value={data.description}
         onChange={changeHandler}
         name='description'
         minRows={3}
          />
         
      </div>
      </div>
    }


     </div>
      </div>
      <div className="modal-footer">
      <div className='mt-3 mx-5'>
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">cancel</button>
        <button type="button" className="btn btn-primary" onClick={createArticleHandler} data-bs-dismiss="modal">Create Notice</button>
          </div>
      </div>
    </div>
  </div>
</div>


{/* edit notice modal  */}
<div className="modal fade" id="editarticle" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="staticBackdropLabel">Edit Notice</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>{
             setData({...data,
              title:"",
      description:"",
      addedBy:"",
      date:""
            })
        }}></button>
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
          label="Title:"
          type='text'
          value={data.title}
          onChange={changeHandler}
          name='title'
          fullWidth
           style={{marginBottom:"10px"}}
          placeholder='Enter Title'
          
        />
     
      <TextField
          required
          id="outlined-required"
          label="Added By:"
          type='text'
          value={data.addedBy}
          onChange={changeHandler}
          name='addedBy'
          fullWidth
        style={{marginBottom:"10px"}}
          placeholder='Added By'
          
        />
      <TextField
          required
          id="outlined-required"
          label="Date"
          value={data.date}
          onChange={changeHandler}
          name='date'
          type='date'
          fullWidth
          style={{marginBottom:"10px"}}
          
          
        />
        <Textarea
         placeholder="Enter Description"
         label="Description"
         value={data.description}
         onChange={changeHandler}
         name='description'
         minRows={3}
          />
      </div>
      </Box>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={()=>{
             setData({...data,
              title:"",
      description:"",
      addedBy:"",
      date:""
            })
        }}>cancel</button>
        <button type="button" className="btn btn-primary" onClick={updateArticleHandler} data-bs-dismiss="modal">Update Notice</button>
      </div>
    </div>
  </div>
</div>
    {/* </div> */}
    
    </div>
   <div >
    <FooterComponent />

   </div>

     </div>
  )
}
