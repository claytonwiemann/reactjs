import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { makeStyles } from '@mui/styles';
import jsonData from './play_voices.json';
import { createTheme, ThemeProvider } from '@mui/material/styles';



// My MUI Theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ffffff',
      contrastText: '#000000',
    },
    background: {
      default: '#f0f0f0',
    },
  },
  shape: {
    borderRadius: 8,
  },
});



//using makeStyles to set the custom styles
const useStyles = makeStyles((theme) => ({
  listContainer: {
    maxWidth: 600,
    margin: 'auto',
    padding: theme.spacing(2),
    backgroundColor: '#e0e0e0',
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3],
  },
  summary: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    borderRadius: theme.shape.borderRadius,
    '&.Mui-expanded': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
  },
  details: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    borderRadius: theme.shape.borderRadius,
  },
}));



function DropdownList() {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(null); //manages which item can be expanded

  //change event
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.listContainer}>
      {jsonData.map((item, index) => (
        <Accordion
          key={item.id}
          expanded={expanded === `panel${index}`} //see if expanded
          onChange={handleChange(`panel${index}`)} //change from expanded/collapsed
        >
          
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            className={classes.summary}
          >
            <Typography className={classes.summaryText}>{item.name + "  |  " + item.language + "  |  " + item.accent}</Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.details}>
            <div>
              {Object.entries(item).map(([key, value]) => (
                <div key={key}>
                  <Typography>{key}: {value}</Typography>
                </div>
              ))}
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <DropdownList />
    </ThemeProvider>
  );
}

export default App;
