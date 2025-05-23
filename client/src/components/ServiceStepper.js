import { Box } from '@mui/material';
import React, { useState } from 'react';

const stepLabels = [
    { label: 'Service Inspection', key: 'ServiceInspectionDate' },
    { label: 'Service', key: 'ServiceDate' },
    { label: 'Plans (Service) ', key: 'PlansServiceDate' },
    { label: 'Final Inspection (Service)', key: 'FinalInspectionServiceDate' },
    { label: 'PTO (Service)', key: 'PTOServiceDate' },
    { label: 'Partner Submission', key: 'PartnerSubmissionDate' },
    { label: 'Invoice (Inspection)', key: 'InvoiceInspectionDate' },
    { label: 'Invoice(Serivce)', key: 'InvoiceSerivceDate' },
    { label: 'Invoice(PTO)', key: 'InvoicePTODate' },
    { label: 'FDA & CP (Serivce)', key: 'FDACPServiceDate' },
    { label: 'Service Package Submitted', key: 'ServicePackageSubmittedDate' }
    
   
];
const StatusStepLabels = [
    { label: 'In Queue', key: '01-01-2024' },
    { label: 'Scheduled', key: '01-02-2024' },
    { label: 'Complete', key: '01-03-2024' }
const ServiceStepper = ({ activeStep, taskDates, financing }) => {
    const [open, setOpen] = useState(false);
    const [selectedStep, setSelectedStep] = useState(null);
    const handleOpen = (step) => {
        setSelectedStep(step);
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        setSelectedStep(null);
    return (
        <div>
            <Typography> Service Milestones</Typography>
            <Stepper sx={{ paddingLeft: '50px', backgroundColor: 'whitesmoke', borderRadius: 2 }} activeStep={activeStep} orientation="vertical">
                {stepLabels.map((step, index) => {
                    let stepContent;
                    if (step.key === 'NTPDate' && financing === "Sunnova") {
                        stepContent = (
                            <Typography variant="caption" style={{ marginLeft: '10px', color: 'green' }}>
                                NTP not required for Sunnova
                            </Typography>
                        );
                    } else {
                        const stepDate = taskDates[step.key];
                        const isCompleted = Boolean(stepDate);
                        stepContent = isCompleted ? (
                                {stepDate}
                        ) : null;
                    }
                    return (
                        <Step key={step.label} completed={Boolean(taskDates[step.key]) || (step.key === 'NTPDate' && financing === "Sunnova")}>
                            <StepLabel onClick={() => handleOpen(step)}>
                                {step.label}
                                {stepContent}
                            </StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{ ...style, width: 400 }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Status History for {selectedStep?.label}
                    </Typography>
                    <Stepper activeStep={-1} orientation="vertical">
                        {StatusStepLabels.map((statusStep, index) => (
                            <Step key={statusStep.label}>
                                <StepLabel>{statusStep.label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Box>
            </Modal>
        </div>
    );
};
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
export default ServiceStepper;
