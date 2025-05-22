import { Button, Input, Box, Stack, Heading } from "@chakra-ui/react";
import React from 'react'; // Import React as a whole without destructuring
import { Helmet } from 'react-helmet-async';
import { useDropzone } from 'react-dropzone';

import DealsData from '../components/dataGrid/DealsData'; // Assuming this is your chart
import UpcomingPayData from '../components/dataGrid/UpcomingPay';
import { useAppSelector } from '../hooks/hooks';
import { authSelector } from '../redux/slice/authSlice';
export default function UpcomingPayPage() {
  const { data, unlocked } = useAppSelector(authSelector); // Assuming `unlocked` controls the modal vs chart view
  const recordId = data?.recordID;
  // Modal state management
  const [isMessageModalOpen, setMessageModalOpen] = React.useState(false);
  const [messageText, setMessageText] = React.useState('');
  const [fileUrls, setFileUrls] = React.useState([]);
  const handleOpenMessageModal = () => {
    setMessageModalOpen(true);
  };
  const handleCloseMessageModal = () => {
    setMessageModalOpen(false);
    setFileUrls([]); // Reset file URLs when closing the modal
  const onDrop = (acceptedFiles) => {
    const urls = acceptedFiles.map((file) => URL.createObjectURL(file));
    setFileUrls(urls); // Store the local URLs of uploaded files
  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  const handleSendMessage = () => {
    // Handle message submission logic here
    handleCloseMessageModal();
  return (
    <React.Fragment>
      <Helmet>
        <title>Deals</title>
      </Helmet>
      <Container>
        <h2>Anticipated Pay this Friday</h2>
        {/* Conditional rendering based on 'unlocked' flag */}
        {false ? (
          // Render the modal when 'unlocked' is true
          <>
  <Button
    variant="contained"
    onClick={handleOpenMessageModal}
    sx={{ mt: 4, backgroundColor: '#1976d2', color: '#fff', '&:hover': { backgroundColor: '#1565c0' } }}
  >
    Upload Driver's License
  </Button>
  
  <Dialog open={isMessageModalOpen} onClose={handleCloseMessageModal} maxWidth="sm" fullWidth>
    <DialogTitle>Upload Driver's License</DialogTitle>
    <DialogContent>
      <section className="container" style={{ marginTop: '20px', padding: '20px', backgroundColor: '#fafafa', borderRadius: '8px' }}>
        <div
          {...getRootProps({ className: 'dropzone' })}
          style={{
            border: '2px dashed #ddd',
            padding: '40px',
            textAlign: 'center',
            borderRadius: '8px',
            cursor: 'pointer',
            backgroundColor: '#fff',
            transition: 'border-color 0.3s ease',
            '&:hover': {
              borderColor: '#1976d2'
            }
          }}
        >
          <input {...getInputProps()} />
          <p style={{ color: '#666', fontSize: '16px' }}>
            Drag 'n' drop files here, or <span style={{ color: '#1976d2', fontWeight: 'bold', cursor: 'pointer' }}>click to select files</span>
          </p>
        </div>
        <aside style={{ marginTop: '20px' }}>
          <h4 style={{ color: '#333', fontSize: '18px' }}>Uploaded Files</h4>
          <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
            {fileUrls.length > 0 ? (
              fileUrls.map((url, index) => (
                <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  <InsertDriveFileIcon style={{ marginRight: '8px', color: '#1976d2' }} />
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#1976d2', textDecoration: 'none' }}
                  >
                    {url.slice(0, 20) + '...'}
                  </a>
                </li>
              ))
            ) : (
              <li style={{ color: '#999' }}>No files uploaded yet</li>
            )}
          </ul>
        </aside>
      </section>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleCloseMessageModal} sx={{ color: '#666' }}>
        Cancel
      </Button>
      <Button onClick={handleSendMessage} sx={{ backgroundColor: '#1976d2', color: '#fff', '&:hover': { backgroundColor: '#1565c0' } }}>
        Submit
    </DialogActions>
  </Dialog>
</>
        ) : (
          // Render the DealsData (chart) when 'unlocked' is false
          <Card sx={{ p: '1rem' }}>
            <UpcomingPayData recordUserId={recordId} />
          </Card>
        )}
      </Container>
    </React.Fragment>
  );
}
