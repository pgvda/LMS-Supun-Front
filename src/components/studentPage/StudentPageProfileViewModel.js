import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { styled, css } from '@mui/system';
import { Modal as BaseModal, Typography, Box, IconButton, Divider, Chip, Avatar } from '@mui/material';
import axios from 'axios';
import Api from '../../utils/Api';
import { BlueButton } from '../../utils/CommonStyle';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import SchoolIcon from '@mui/icons-material/School';
import CakeIcon from '@mui/icons-material/Cake';
import profileImg from '../../assets/profileLogo.png'

const StudentPageProfileViewModel = ({ open, handleClose, id }) => {
    const [profileData, setProfileData] = React.useState({});
    const [loading, setLoading] = React.useState(true);
    const token = localStorage.getItem('token');
    
    React.useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(Api + 'students/student/getbyid/' + id, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (response.data.code === 200) {
                    setProfileData(response.data.data);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchData();
    }, [id]);


    const formatKey = (key) => {
        return key.replace(/([A-Z])/g, ' $1').trim().charAt(0).toUpperCase() + 
               key.replace(/([A-Z])/g, ' $1').trim().slice(1);
    };
    

    const getFieldIcon = (key) => {
        if (key.toLowerCase().includes('name')) return <PersonIcon fontSize="small" />;
        if (key.toLowerCase().includes('email')) return <EmailIcon fontSize="small" />;
        if (key.toLowerCase().includes('school') || key.toLowerCase().includes('class')) 
            return <SchoolIcon fontSize="small" />;
        if (key.toLowerCase().includes('birth') || key.toLowerCase().includes('age')) 
            return <CakeIcon fontSize="small" />;
        return null;
    };


    const displayableKeys = (data) => {
        const excludedKeys = ['profileImg', 'id', 'password', 'token', 'otp', '__v', 'isDelete'];
        return Object.entries(data).filter(([key]) => !excludedKeys.includes(key));
    };

    return (
        <Modal
            aria-labelledby="student-profile-modal-title"
            aria-describedby="student-profile-modal-description"
            open={open}
            onClose={handleClose}
            slots={{ backdrop: StyledBackdrop }}
            keepMounted
        >
            <ModalContent>
                <ModalHeader>
                    <Typography variant="h5" fontWeight="600">
                        Student Profile
                    </Typography>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{ color: 'text.secondary' }}
                    >
                        <CloseIcon />
                    </IconButton>
                </ModalHeader>
                
                {loading ? (
                    <LoadingContainer>
                        <Typography>Loading profile...</Typography>
                    </LoadingContainer>
                ) : (
                    <>
                        <ProfileImageSection>
                            <ProfileImage 
                                src={profileImg} 
                                alt="Profile" 
                            />
                            {profileData.name && (
                                <NameBadge>
                                    <Typography variant="h6" fontWeight="bold">
                                        {profileData.name}
                                    </Typography>
                                    {profileData.studentId && (
                                        <Chip 
                                            label={`ID: ${profileData.studentId}`} 
                                            size="small" 
                                            color="primary" 
                                            sx={{ ml: 1 }} 
                                        />
                                    )}
                                </NameBadge>
                            )}
                        </ProfileImageSection>
                        
                        <Divider sx={{ my: 2 }} />
                        
                        <ProfileDetails>
                            {displayableKeys(profileData).map(([key, value]) => (
                                <ProfileField key={key}>
                                    {getFieldIcon(key) && (
                                        <IconWrapper>
                                            {getFieldIcon(key)}
                                        </IconWrapper>
                                    )}
                                    <FieldContent>
                                        <FieldLabel>{formatKey(key)}</FieldLabel>
                                        <FieldValue>{value || 'N/A'}</FieldValue>
                                    </FieldContent>
                                </ProfileField>
                            ))}
                        </ProfileDetails>
                        
                        <ActionFooter>
                            <BlueButton onClick={handleClose} fullWidth>
                                Close
                            </BlueButton>
                        </ActionFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

StudentPageProfileViewModel.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    id: PropTypes.string,
};

export default StudentPageProfileViewModel;

const Backdrop = React.forwardRef((props, ref) => (
    <div className={clsx({ 'base-Backdrop-open': props.open }, props.className)} ref={ref} {...props} />
));

Backdrop.propTypes = {
    className: PropTypes.string.isRequired,
    open: PropTypes.bool,
};

const Modal = styled(BaseModal)`
    position: fixed;
    z-index: 1300;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
    z-index: -1;
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(3px);
    -webkit-tap-highlight-color: transparent;
`;

const ModalContent = styled('div')`
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border-radius: 16px;
    width: 450px;
    max-width: 90vw;
    max-height: 85vh;
    overflow-y: auto;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
    transition: all 0.3s ease-in-out;
    animation: fadeIn 0.3s ease-out;
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: scale(0.9);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
`;

const ModalHeader = styled('div')`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 24px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
`;

const ProfileImageSection = styled('div')`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 24px 24px 0px;
`;

const ProfileImage = styled('img')`
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid #fff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const NameBadge = styled('div')`
    display: flex;
    align-items: center;
    margin-top: 16px;
    text-align: center;
    flex-wrap: wrap;
    justify-content: center;
`;

const ProfileDetails = styled('div')`
    padding: 0 24px;
`;

const ProfileField = styled('div')`
    display: flex;
    margin-bottom: 16px;
    padding-bottom: 8px;
    border-bottom: 1px dashed rgba(0, 0, 0, 0.05);
    
    &:last-child {
        border-bottom: none;
    }
`;

const IconWrapper = styled('div')`
    display: flex;
    align-items: center;
    color: #666;
    margin-right: 12px;
`;

const FieldContent = styled('div')`
    flex: 1;
`;

const FieldLabel = styled(Typography)`
    font-size: 0.85rem;
    color: #888;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
`;

const FieldValue = styled(Typography)`
    font-size: 1rem;
    font-weight: 500;
    color: #333;
`;

const ActionFooter = styled('div')`
    padding: 16px 24px 24px;
    margin-top: 8px;
`;

const LoadingContainer = styled('div')`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px;
`;