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
  const [currentFiles, setCurrentFiles] = useState([]);
  const [pathStack, setPathStack] = useState([]); // to manage navigation history
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  const userEmail = localStorage.getItem('email');

  // Fetch main (root) folders
  const fetchMainFolders = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://historywithchandima.site/api/folders/diveRootFiles/${userEmail}`);
      if (!response.ok) throw new Error('Failed to fetch root folders');
      const data = await response.json();
      setCurrentFiles(data.files);
    } catch (error) {
      console.error('Error fetching main folders:', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch folder contents
  const fetchFolderContents = async (folderId) => {
    try {
      setLoading(true);
      const response = await fetch(`https://historywithchandima.site/api/folders/folderContent/${folderId}`);
      if (!response.ok) throw new Error('Failed to fetch folder content');
      const data = await response.json();
      setCurrentFiles(data.files);
    } catch (error) {
      console.error('Error fetching folder content:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFolderClick = async (folderId, folderName) => {
    setPathStack((prev) => [...prev, { id: folderId, name: folderName }]);
    await fetchFolderContents(folderId);
  };

  const handleBack = async () => {
    const updatedStack = [...pathStack];
    updatedStack.pop();

    if (updatedStack.length === 0) {
      await fetchMainFolders();
    } else {
      const lastFolder = updatedStack[updatedStack.length - 1];
      await fetchFolderContents(lastFolder.id);
    }

    setPathStack(updatedStack);
  };

  useEffect(() => {
    fetchMainFolders();
  }, []);

  const FileCard = ({ file }) => {
    const mimeType = file.mimeType?.trim();
    const name = file.name?.trim();

    const isFolder = mimeType === 'application/vnd.google-apps.folder';
    const isVideo = mimeType === 'video/mp4' || name.endsWith('.mp4');
    const isPDF = mimeType === 'application/pdf' || name.endsWith('.pdf');

    return (
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
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            {isFolder ? (
              <FolderIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
            ) : (
              <InsertDriveFileIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
            )}
            <Typography variant="h6" sx={{ ml: 2, wordBreak: 'break-word', fontWeight: 500 }}>
              {name}
            </Typography>
          </Box>
        </CardContent>

        <CardActions sx={{ p: 2, pt: 0 }}>
          {isVideo || isPDF ? (
            <Button
              variant="contained"
              fullWidth
              onClick={() => {
                const encodedId = btoa(file.id);
                window.open(`https://historywithchandima.site/api/secure-folders/secure-file?id=${encodedId}`, '_blank');
              }}
              sx={{ textTransform: 'none', py: 1, borderRadius: 2 }}
            >
              View File
            </Button>
          ) : (
            <Button
              variant="contained"
              fullWidth
              onClick={() => handleFolderClick(file.id, file.name)}
              sx={{ textTransform: 'none', py: 1, borderRadius: 2 }}
            >
              Open Folder
            </Button>
          )}
        </CardActions>
      </Card>
    );
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ minHeight: '75vh', py: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          {pathStack.length > 0 && (
            <IconButton onClick={handleBack} sx={{ mr: 2 }}>
              <ArrowBackIcon />
            </IconButton>
          )}
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 600, color: theme.palette.text.primary, mb: 1 }}>
              Google Drive Files
            </Typography>
            <Breadcrumbs aria-label="breadcrumb">
              <Link color="inherit" sx={{ cursor: 'pointer', textDecoration: 'none' }} onClick={fetchMainFolders}>
                Home
              </Link>
              {pathStack.map((item, index) => (
                <Typography key={index} color="text.primary">
                  {item.name}
                </Typography>
              ))}
            </Breadcrumbs>
          </Box>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
            <CircularProgress size={60} />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {currentFiles.length > 0 ? (
              currentFiles.map((file) => (
                <Grid item xs={12} sm={6} md={4} key={file.id}>
                  <FileCard file={file} />
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Typography variant="body1" sx={{ textAlign: 'center', color: theme.palette.text.secondary, py: 8 }}>
                  No files found.
                </Typography>
              </Grid>
            )}
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default HomePage;
