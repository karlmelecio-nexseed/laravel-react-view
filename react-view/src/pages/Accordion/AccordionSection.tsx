import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Accordion, AccordionSummary, Typography, AccordionDetails, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import AccordionContent from '../../components/AccordionContent';
import { QueryClient, QueryClientProvider } from 'react-query';


const queryClient = new QueryClient();

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 9999,
  },
  accordionContainer: {
    backgroundColor: '#fff',
    padding: theme.spacing(3),
    borderRadius: theme.spacing(1),
    width: '80%',
    maxWidth: '1000px',
    margin: '0 auto',
    textAlign: 'center',
  },
  accordionDetails: {
    display: 'block',
    padding: '8px 16px 16px',
  },
  closeButton: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
  },
}));

const AccordionSection = () => {
  const classes = useStyles();
  const accordionRef = React.useRef(null);
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
    {isOpen && ( // Render modal only when isOpen is true
      <div className={classes.modal}>
        <div className={classes.accordionContainer}>
          <Grid container>
            <Grid item xs={12}>
              <IconButton className={classes.closeButton} onClick={handleClose}>
                <CloseIcon />
              </IconButton>
              <Accordion ref={accordionRef}>
                <AccordionSummary>
                  <Typography>Accordion Title</Typography>
                </AccordionSummary>
                <AccordionDetails className={classes.accordionDetails}>
                <QueryClientProvider client={queryClient}>
                  <AccordionContent />
                </QueryClientProvider>  
                </AccordionDetails>
              </Accordion>
            </Grid>
          </Grid>
        </div>
      </div>
    )}
  </>
  );
};

export default AccordionSection;
