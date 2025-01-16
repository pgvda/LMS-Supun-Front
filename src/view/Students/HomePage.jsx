import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  CircularProgress,
  Container,
  IconButton,
  Breadcrumbs,
  Link,
  useTheme,
} from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FolderIcon from '@mui/icons-material/Folder';

const HomePage = () => {
  const [files, setFiles] = useState([]);
  const [fileContent, setFileContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isClicked, setIsClicked] = useState(false);
  const theme = useTheme();

  const userEmail = localStorage.getItem('email');

  const fetchFiles = async () => {
    try {
      const email = userEmail;
      const response = await fetch(`http://localhost:4000/files?email=${encodeURIComponent(email)}`);
      if (!response.ok) throw new Error('Failed to fetch files');
      const data = await response.json();
      setFiles(data);
    } catch (error) {
      console.error('Error fetching files:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFolderView = async (folderId) => {
    setIsClicked(true);
    try {
      const response = await fetch(`http://localhost:4000/files/content/${folderId}`);
      if (!response.ok) throw new Error('Failed to fetch files');
      const data = await response.json();
      setFileContent(data);
    } catch (error) {
      console.error('Error fetching files:', error.message);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const FileCard = ({ file, onClick, isLink }) => (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.shadows[8],
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Box 
          sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 2,
          }}
        >
          {isLink ? (
            <InsertDriveFileIcon 
              sx={{ 
                fontSize: 40,
                color: theme.palette.primary.main,
              }} 
            />
          ) : (
            <FolderIcon 
              sx={{ 
                fontSize: 40,
                color: theme.palette.primary.main,
              }} 
            />
          )}
          <Typography
            variant="h6"
            sx={{
              ml: 2,
              wordBreak: 'break-word',
              fontWeight: 500,
            }}
          >
            {file.name}
          </Typography>
        </Box>
      </CardContent>
      <CardActions sx={{ p: 2, pt: 0 }}>
        {isLink ? (
          <Button
            variant="contained"
            fullWidth
            href={`https://drive.google.com/file/d/${file.id}/view`}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              textTransform: 'none',
              py: 1,
              borderRadius: 2,
            }}
          >
            View File
          </Button>
        ) : (
          <Button
            variant="contained"
            fullWidth
            onClick={() => onClick(file.id)}
            sx={{
              textTransform: 'none',
              py: 1,
              borderRadius: 2,
            }}
          >
            Open Folder
          </Button>
        )}
      </CardActions>
    </Card>
  );

  return (
    <Container maxWidth="lg">
      <Box 
        sx={{ 
          minHeight: '75vh',
          py: 4,
        }}
      >
        <Box 
          sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 4,
          }}
        >
          {isClicked && (
            <IconButton
              onClick={() => setIsClicked(false)}
              sx={{ mr: 2 }}
            >
              <ArrowBackIcon />
            </IconButton>
          )}
          <Box>
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 600,
                color: theme.palette.text.primary,
                mb: 1,
              }}
            >
              Google Drive Files
            </Typography>
            <Breadcrumbs aria-label="breadcrumb">
              <Link 
                color="inherit" 
                href="#"
                sx={{ 
                  cursor: 'pointer',
                  textDecoration: 'none',
                }}
              >
                Home
              </Link>
              {isClicked && (
                <Typography color="text.primary">Folder Contents</Typography>
              )}
            </Breadcrumbs>
          </Box>
        </Box>

        {loading ? (
          <Box 
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '300px',
            }}
          >
            <CircularProgress size={60} />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {!isClicked ? (
              files.length > 0 ? (
                files.map((file) => (
                  <Grid item xs={12} sm={6} md={4} key={file.id}>
                    <FileCard file={file} onClick={handleFolderView} isLink={false} />
                  </Grid>
                ))
              ) : (
                <Grid item xs={12}>
                  <Typography 
                    variant="body1"
                    sx={{
                      textAlign: 'center',
                      color: theme.palette.text.secondary,
                      py: 8,
                    }}
                  >
                    No files found.
                  </Typography>
                </Grid>
              )
            ) : (
              fileContent.map((file) => (
                <Grid item xs={12} sm={6} md={4} key={file.id}>
                  <FileCard file={file} onClick={null} isLink={true} />
                </Grid>
              ))
            )}
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default HomePage;