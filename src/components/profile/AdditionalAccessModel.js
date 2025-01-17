import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { styled, css } from '@mui/system';
import { Modal as BaseModal } from '@mui/base/Modal';
import { FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import axios from 'axios';
import Api from '../../utils/Api';
import { BlueButton } from '../../utils/CommonStyle';

const AdditionalAccessModel = ({ open, handleClose }) => {
    const [classTypes, setClassTypes] = React.useState([]);
    const [email, setEmail] = React.useState('');
    const [className, setClassName] = React.useState('');

    const token = localStorage.getItem('token');

    const fetchClassType = async () => {
        try {
            const response = await axios.get(Api + 'folders/folder-names')

            console.log(response)

            if (response.data.code === 200) {
                setClassTypes(response.data.data)
            }
        } catch (err) {
            console.error(err)
        }
    }

    const handleSubmit = async() => {
        try{
            const response = await axios.post(Api + 'students/student/give-additional-access',{
                email:email,
                className:className
            },{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })

            console.log(response);
        }catch(err){
            console.error(err)
        }
    }

    const handleClassNameChange = (event) => {
        const newClassName = event.target.value;
        setClassName(newClassName);

    };

    React.useEffect(() => {
        fetchClassType();
    }, [])
    return (
        <Modal
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
            open={open}
            onClose={handleClose}
            slots={{ backdrop: StyledBackdrop }}
            keepMounted
        >
            <ModalContent sx={{ width: 400 }}>
                <Typography sx={{ fontSize: { xs: 'auto', md: '20', fontWeight: 700, textAlign: 'center' } }}>Give Additional Access</Typography>
                <TextField size='small' id="outlined-basic" label="Email" variant="outlined" sx={{ width: '100%', my: 2 }}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <FormControl fullWidth size="small">
                    <InputLabel id="class-select-label">Class</InputLabel>
                    <Select
                        labelId="class-select-label"
                        value={className}
                        onChange={handleClassNameChange}
                        label="Class"
                        name="className"
                    >
                        {classTypes.map((data, index) => (
                            <MenuItem key={index} value={data}>
                                {data}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <BlueButton sx={{my:1}} onClick={handleSubmit}>Submit</BlueButton>
            </ModalContent>
        </Modal>
    )
}

export default AdditionalAccessModel;


const Backdrop = React.forwardRef((props, ref) => {
    const { open, className, ...other } = props;
    return (
        <div
            className={clsx({ 'base-Backdrop-open': open }, className)}
            ref={ref}
            {...other}
        />
    );
});

Backdrop.propTypes = {
    className: PropTypes.string.isRequired,
    open: PropTypes.bool,
};

const blue = {
    200: '#99CCFF',
    300: '#66B2FF',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    700: '#0066CC',
};

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};

const Modal = styled(BaseModal)(`
    position: fixed;
    z-index: 1300;
    right: 0;
    bottom: 0;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  
    &.base-Modal-hidden {
      visibility: hidden;
    }
  `);

const StyledBackdrop = styled(Backdrop)`
    z-index: -1;
    position: fixed;
    inset: 0;
    background-color: rgb(0 0 0 / 0.5);
    -webkit-tap-highlight-color: transparent;
  `;

const ModalContent = styled('div')(
    ({ theme }) => css`
      font-family: 'IBM Plex Sans', sans-serif;
      font-weight: 500;
      text-align: start;
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 8px;
      overflow: hidden;
      background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
      border-radius: 8px;
      border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
      box-shadow: 0 4px 12px
        ${theme.palette.mode === 'dark' ? 'rgb(0 0 0 / 0.5)' : 'rgb(0 0 0 / 0.2)'};
      padding: 24px;
      color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};
  
      & .modal-title {
        margin: 0;
        line-height: 1.5rem;
        margin-bottom: 8px;
      }
  
      & .modal-description {
        margin: 0;
        line-height: 1.5rem;
        font-weight: 400;
        color: ${theme.palette.mode === 'dark' ? grey[400] : grey[800]};
        margin-bottom: 4px;
      }
    `,
);

const TriggerButton = styled('button')(
    ({ theme }) => css`
      font-family: 'IBM Plex Sans', sans-serif;
      font-weight: 600;
      font-size: 0.875rem;
      line-height: 1.5;
      padding: 8px 16px;
      border-radius: 8px;
      transition: all 150ms ease;
      cursor: pointer;
      background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
      border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
      color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
      box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  
      &:hover {
        background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
        border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
      }
  
      &:active {
        background: ${theme.palette.mode === 'dark' ? grey[700] : grey[100]};
      }
  
      &:focus-visible {
        box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? blue[300] : blue[200]};
        outline: none;
      }
    `,
);