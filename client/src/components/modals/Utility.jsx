import { Button, Input, Box, Stack, Heading } from "@chakra-ui/react";
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import { baseURL } from '../../libs/client/apiClient';

const UtilityBillUploadModal = ({ open, setOpen }) => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState('');
    const [error, setError] = useState('');
    
    const onDrop = useCallback(acceptedFiles => {
        setFile(acceptedFiles[0]); // Store the file object directly
        setResult(''); // Clear previous results
        setError('');  // Clear previous errors
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
    const handleSubmit = async () => {
        if (!file) {
            setError('No file selected.');
            return;
        }
        const formData = new FormData();
        formData.append('file', file); // Ensure the key 'file' matches the expected key on the server side
        setLoading(true);
        try {
            const response = await fetch(`${baseURL}/auth/uploadUtilityBill`, {
                method: 'POST',
                body: formData, // Send formData object
                // Do not set Content-Type header when using FormData; the browser will set it, including the boundary parameter
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.text();
            setResult(`Analysis Result: ${data}`);
        } catch (error) {
            console.error('Error uploading bill:', error);
            setError('Failed to process the bill. Please try again.');
        } finally {
            setLoading(false);
    };
    const handleClose = () => {
        setOpen(false);
        setFile(null);
        setResult('');
        setError('');
    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>Upload Utility Bill</DialogTitle>
            <DialogContent>
                <div {...getRootProps()} style={{ border: '2px dashed black', padding: 20, textAlign: 'center' }}>
                    <input {...getInputProps()} />
                    {isDragActive ? <p>Drop the bill here...</p> : <p>Drag 'n' drop a utility bill here, or click to select files</p>}
                    {file && <p>File ready to upload: {file.name}</p>}
                    {loading && <CircularProgress />}
                    {result && <p>{result}</p>}
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit} disabled={!file || loading}>Upload and Analyze</Button>
            </DialogActions>
        </Dialog>
    );
};
UtilityBillUploadModal.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
    baseURL: PropTypes.string.isRequired,
export default UtilityBillUploadModal;
