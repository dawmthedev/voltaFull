import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useDropzone } from 'react-dropzone';
import {
  Button,
  Container,
  Card,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import DealsData from '../components/dataGrid/DealsData';
import { useAppSelector } from '../hooks/hooks';
import { authSelector } from '../redux/slice/authSlice';

export default function DealsPage() {
  const { data, unlocked } = useAppSelector(authSelector);
  const recordId = data?.recordID;

  const [isMessageModalOpen, setMessageModalOpen] = React.useState(false);
  const [fileUrls, setFileUrls] = React.useState([]);

  const handleOpenMessageModal = () => setMessageModalOpen(true);
  const handleCloseMessageModal = () => {
    setMessageModalOpen(false);
    setFileUrls([]);
  };

  const onDrop = (acceptedFiles) => {
    const urls = acceptedFiles.map((file) => URL.createObjectURL(file));
    setFileUrls(urls);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleSendMessage = () => {
    handleCloseMessageModal();
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>Deals</title>
      </Helmet>
      <Container>
        <h2>Projects</h2>
        {false ? (
          <>
            <Button variant="contained" onClick={handleOpenMessageModal} sx={{ mt: 4 }}>
              Upload Driver's License
            </Button>
            <Dialog open={isMessageModalOpen} onClose={handleCloseMessageModal} maxWidth="sm" fullWidth>
              <DialogTitle>Upload Driver's License</DialogTitle>
              <DialogContent>
                <section className="container" style={{ marginTop: '20px', padding: '20px' }}>
                  <div {...getRootProps({ className: 'dropzone' })} style={{ border: '2px dashed #ddd', padding: '40px' }}>
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop files here, or click to select files</p>
                  </div>
                  <aside style={{ marginTop: '20px' }}>
                    <h4>Uploaded Files</h4>
                    <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
                      {fileUrls.length > 0 ? (
                        fileUrls.map((url, index) => (
                          <li key={index} style={{ marginBottom: '8px' }}>
                            <span style={{ marginRight: '8px' }}>📄</span>
                            <a href={url} target="_blank" rel="noopener noreferrer">
                              {url.slice(0, 20) + '...'}
                            </a>
                          </li>
                        ))
                      ) : (
                        <li>No files uploaded yet</li>
                      )}
                    </ul>
                  </aside>
                </section>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseMessageModal}>Cancel</Button>
                <Button onClick={handleSendMessage}>Submit</Button>
              </DialogActions>
            </Dialog>
          </>
        ) : (
          <Card sx={{ p: '1rem' }}>
            <DealsData recordUserId={recordId} />
          </Card>
        )}
      </Container>
    </React.Fragment>
  );
}
