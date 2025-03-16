import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, IconButton, Stack, Switch, Typography } from '@mui/material';
import axios from 'axios';
import Api from '../../utils/Api';
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Swal from 'sweetalert2';
import StudentPageProfileViewModel from '../../components/studentPage/StudentPageProfileViewModel';



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

    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function createData(name, batch, classType, email, regNo, state, id, whatsAppNo) {
    return { name, batch, classType, email, regNo, state, id, whatsAppNo };
}



const StudentsPage = () => {
    const [checked, setChecked] = React.useState(true);
    const [studentDataList, setStudentDataList] = React.useState([]);
    const [isModelOpen, setIsModelOpen] = React.useState(false);
    const [seletedId, setSelectedId] = React.useState();

    const logingId = localStorage.getItem('id');
    const token = localStorage.getItem('token');

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    console.log(logingId);

    const converTrueFales = (state) => {
        if (state === 'active') {
            return true;
        }

        if (state === 'de-active') {
            return false;
        }
    }

    const fetchStudentList = async () => {
        try {
            const response = await axios.get(Api + 'students/student/getallstudents', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'admin_id': logingId
                }
            })

            console.log(response)

            if (response.data.code === 200) {
                setStudentDataList(response.data.data);

            }
        } catch (err) {
            console.error(err)
        }
    }
    const rows = studentDataList
        .sort((a, b) => a.batch.localeCompare(b.batch))
        .map(student =>
            createData(student.name, student.batch, student.classType, student.email, student.regNo, student.accountState, student._id, student.whatsAppNo)
        )




    const updateAccountStatus = async (id, newState) => {
        console.log(id, newState);
        try {
            const response = await axios.put(`${Api}students/student/state/update/${id}`,
                { state: newState },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'admin_id': logingId
                    }
                }
            );

            // fetchStudentList();
            setStudentDataList(prevState =>
                prevState.map(student =>
                    student._id === id ? { ...student, accountState: newState } : student
                )
            );
        } catch (err) {
            console.error('Failed to update account status', err);
        }
    };

    const handleSwitchChange = (id, currentStatus) => {
        const newState = currentStatus === 'active' ? 'de-active' : 'active';
        updateAccountStatus(id, newState);
    };

    const handleDelete = async(id) => {
        try{
            const response = await axios.delete(Api + 'students/student/deletestudent/' + id,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            console.log(response);

            if (response.data.code === 200) {
               await Swal.fire({
                    title: response.data.message,
                    icon: "success",
                    draggable: true,
                    timer: 3000
                });

                window.location.reload();
            }else {
                Swal.fire({
                    title: response.data.message,
                    icon: "warning",
                    draggable: true,
                    timer: 3000
                });
            }

        } catch (err) {
            console.error(err);
            Swal.fire({
                title: "Something Went Wrong !",
                icon: "error",
                draggable: true,
                timer: 3000
            });
        }
    }

    const handleClose = () => {
        setIsModelOpen(false);
    }

    const viewProfileDetails = (id) => {
        setSelectedId(id);
        setIsModelOpen(true);
    }

    React.useEffect(() => {
        fetchStudentList();
    }, [])

    return (
        <Box sx={{ minHeight: '75vh' }}>
            <Box>
                <Typography sx={{
                    fontSize: { xs: '18px', md: '20px' },
                    fontWeight: 700,
                    textAlign: 'left'
                }}>
                    Student List
                </Typography>
            </Box>
            <Box sx={{
                mt: 3
            }}>

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Name</StyledTableCell>
                                <StyledTableCell align="right">Batch</StyledTableCell>
                                <StyledTableCell align="right">ClassType</StyledTableCell>
                                <StyledTableCell align="right">Email</StyledTableCell>
                                <StyledTableCell align="right">Whats AppNo</StyledTableCell>
                                <StyledTableCell align="right">RegNo</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <StyledTableRow key={row.name}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.name}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{row.batch}</StyledTableCell>
                                    <StyledTableCell align="right">{row.classType}</StyledTableCell>
                                    <StyledTableCell align="right">
                                        {row.email}
                                        <IconButton
                                            size="small"
                                            onClick={() => navigator.clipboard.writeText(row.email)}
                                        >
                                            <ContentCopyIcon fontSize="small" />
                                        </IconButton>
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{row.whatsAppNo}</StyledTableCell>
                                    <StyledTableCell align="right">{row.regNo}</StyledTableCell>
                                    <StyledTableCell align="right">
                                        <Switch
                                            checked={converTrueFales(row.state)}
                                            onChange={() => handleSwitchChange(row.id, row.state)}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <Stack direction={'row'} spacing={2}>
                                            <DeleteIcon sx={{
                                                color:'red',
                                                ":hover":{
                                                    scale:1.1
                                                }
                                            }} onClick={()=>handleDelete(row.id)}/>
                                            <EditIcon sx={{
                                                ":hover":{
                                                    scale:1.1
                                                }
                                            }}/>
                                            <Button 
                                            onClick={() => viewProfileDetails(row.id)}
                                            sx={{
                                                textTransform:'capitalize',
                                                
                                            }}>View</Button>
                                        </Stack>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </Box>
            <StudentPageProfileViewModel open={isModelOpen} handleClose={handleClose} id={seletedId}/>
        </Box>
    )
}

export default StudentsPage