import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
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
import { styled } from '@mui/material/styles';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../Login.css";
import FooterComponent from './FooterComponent';
import ResidentNavbar from './ResidentNavbar';

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
  createData('Frozen yoghurt', '2023-08-21', '2023-08-22', 'Ali Raza', 'Subhan Ullah'),
  createData('Ice cream sandwich', '2023-08-21', '2023-08-22', 'test', 'test'),
  createData('Eclair', '2023-08-21', '2023-08-22', 'test', 'test'),
  createData('Cupcake', '2023-08-21', '2023-08-22', 'test', 'test'),
  createData('Gingerbread', '2023-08-21', '2023-08-22', 'test', 'test'),
];
const VoteCasting = () => {
  const [positionList, setPositionList] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [positionData, setPositionData] = useState({});
  const [voteposition, setVotePosition] = useState("")
  const [voteresult, setVoteResult] = useState([])
  const [candidateNo1, setCandidateNo1] = useState('')
  const [candidateNo2, setCandidateNo2] = useState('')
  const [Result, setResult] = useState({
    cand1: 0,
    cand2: 0,
  })
  const [selectedCandidate, setSelectedCandidate] = useState('');
  const [options, setOptions] = useState({
    chart: {
      id: 'apexchart-example'
    },
    xaxis: {
      categories: []
    }
  });

  const [series, setSeries] = useState([
    {
      name: 'votes',
      data: []
    }
  ]);
  const handleClickOpen = (id) => {
    setOpen(true);
    setPositionData(id)
  };

  const handleClose = () => {
    setOpen(false);
  };

  const voteLetsCash = async () => {
    try {
      var checkCandidate;
      if (selectedCandidate === "Candidate 1") {
        checkCandidate = positionData?.candidate1
      }
      else if (selectedCandidate === "Candidate 2") {
        checkCandidate = positionData?.candidate2
      }
      console.log(localStorage.getItem("key"));
      const response = await axios.post(`/election/position/cast-vote`, {
        position: positionData?.position,
        key: localStorage.getItem("key"),
        candidateName: checkCandidate
      })
      if (response) {
        setPositionData({})
        setOpen(false);
        setSelectedCandidate("")
        toast.success("Vote Casted Successfully", {
          position: toast.POSITION.TOP_LEFT
        });
      }
    } catch (error) {
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
  const voteResultHandler = async (datas) => {
    try {
      setVotePosition(datas?.position)
      setCandidateNo1(datas?.candidate1)
      setCandidateNo2(datas?.candidate2)
      const newCategories = [...options.xaxis.categories, datas?.candidate1, datas?.candidate2];
      setOptions({
        ...options,
        xaxis: {
          ...options.xaxis,
          categories: newCategories
        }
      });

      const response = await axios({
        method: 'GET',
        url: `/election/position/results?position=${datas?.position}`,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      let filteredResults = response.data?.candidateVotingResults?.find((row) => {
        return row.candidateName === datas?.candidate1;
      });

      let filteredResults1 = response.data?.candidateVotingResults?.find((row) => {
        return row.candidateName === datas?.candidate2;
      });

      const votesReceivedCandidate1 = filteredResults?.votesReceived || 0;
      const votesReceivedCandidate2 = filteredResults1?.votesReceived || 0;
      setResult({
        ...Result,
        cand1: votesReceivedCandidate1,
        cand2: votesReceivedCandidate2
      })
      setSeries([
        {
          name: 'votes',
          data: [votesReceivedCandidate1, votesReceivedCandidate2]
        }
      ]);
      setVoteResult(response.data?.candidateVotingResults)
    } catch (error) {
      console.log(error);
    }

  }
  let checkrole = localStorage.getItem("role")

  const getAllPositions = async () => {

    try {
      const response = await axios.get(`/election/positions`)
      if (response) {
        setPositionList(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const isChartReady = series[0].data.length > 0 && options.xaxis.categories.length > 0;

  useEffect(() => {
    getAllPositions();
  }, [])
  return (
    <>
      {/* navbar  */}
      <div className="ResidentNavbar" >
        <ResidentNavbar />
      </div>



      <div className='vote-casting-container'>
        {/* for displaying data in table  */}
        <div className='table-container-votecasting'>
          <h1 className="committeeHome-h3">Vote Casting</h1>
        </div>
        <TableContainer component={Paper} >
          <Table className='vote-casting-table' aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Position Name</StyledTableCell>
                <StyledTableCell align="right" className='vote-casting-mobile'>Election Start Date</StyledTableCell>
                <StyledTableCell align="right" className='vote-casting-mobile'>Election End Date</StyledTableCell>
                <StyledTableCell align="right">Candidate 1</StyledTableCell>
                <StyledTableCell align="right">Candidate 2</StyledTableCell>
                <StyledTableCell align="center">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {positionList?.map((row) => (
                <StyledTableRow key={row.position}>
                  <StyledTableCell component="th" scope="row">
                    {row.position}
                  </StyledTableCell>
                  <StyledTableCell align="right" className='vote-casting-mobile'>{formatDate(row.electionStartDate)}</StyledTableCell>
                  <StyledTableCell align="right" className='vote-casting-mobile'>{formatDate(row.electionEndDate)}</StyledTableCell>
                  <StyledTableCell align="right">{row.candidate1}</StyledTableCell>
                  <StyledTableCell align="right">{row.candidate2}</StyledTableCell>
                  <StyledTableCell align="center">
                    {
                      checkrole === "resident" &&
                      <Button variant="contained" onClick={() => {
                        handleClickOpen(row)
                      }}>Cast Vote</Button>
                    }
                    {
                      checkrole === "committeemember" && <Button variant="contained" className='mx-3' data-bs-toggle="modal" data-bs-target="#voteresult" onClick={() => voteResultHandler(row)}>Vote Result</Button>
                    }
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
          <ToastContainer />


        </TableContainer>

        {/* vote casting modal  */}
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="draggable-dialog-title"
        >
          <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
            Vote Casting
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are You Sure to Cast Vote ({positionData?.position})?
            </DialogContentText>
            <FormControl>
              <FormLabel className="mt-3">Candidates</FormLabel>
              <RadioGroup name="radio-buttons-group" value={selectedCandidate} onChange={(e) => setSelectedCandidate(e.target.value)}>
                <Radio value="Candidate 1" label={positionData?.candidate1} size="md" />
                <Radio value="Candidate 2" label={positionData?.candidate2} size="md" />
              </RadioGroup>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={voteLetsCash}>Cast</Button>
          </DialogActions>
        </Dialog>


        {/* vote result modal  */}
        <div className="modal fade" id="voteresult" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h2 className="modal-title fs-5" id="staticBackdropLabel">Election Results for the Position of {voteposition} </h2>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => {
                  setVoteResult([])
                  setCandidateNo1('')
                  setCandidateNo2('')
                  setResult({
                    cand1: 0,
                    cand2: 0
                  })
                  setSeries(prevSeries => ({
                    ...prevSeries,
                    [0]: {
                      ...prevSeries[0],
                      data: [] // Resetting the data array
                    }
                  }));

                  setOptions((prevOptions) => ({
                    ...prevOptions,
                    xaxis: {
                      ...prevOptions.xaxis,
                      categories: []
                    }
                  }));
                }}></button>
              </div>
              <div className="modal-body">

                {isChartReady && <div > <Chart options={options} className="vote-result-chart" series={series} type="bar"  /></div>}

                <h5 className='mt-5 committeeHome-h3' >Total Votes ({candidateNo1}): {Result?.cand1}</h5>
                <h5 className='committeeHome-h3' >Total Votes ({candidateNo2}): {Result?.cand2}</h5>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => {
                  setVoteResult([])
                  setCandidateNo1('')
                  setCandidateNo2('')
                  setResult({
                    cand1: 0,
                    cand2: 0
                  })
                  setSeries((prevSeries) => ({
                    ...prevSeries,
                    data: []
                  }));

                  setOptions((prevOptions) => ({
                    ...prevOptions,
                    xaxis: {
                      ...prevOptions.xaxis,
                      categories: []
                    }
                  }));
                }}>Close</button>
              </div>
            </div>
          </div>
        </div>
        <div className='voting-footer'>

          <FooterComponent />
        </div>

      </div>
    </>
  )
}

export default VoteCasting