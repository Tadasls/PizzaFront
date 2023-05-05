import * as React from 'react';
import { Box, Typography, AccordionSummary, AccordionDetails, Accordion } from '@mui/material/';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NewOrder from '../../components/Orders/NewOrder';
import OrdersTable from '../../components/Orders/OldOrders';

function MainPage() {
  return (
    <Box sx={{ marginLeft: '30mm', marginRight: '10mm', mt: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
        Please order your pizza :
      </Typography>
      <Box sx={{ mt: 4 }}>

      <NewOrder />

       
      </Box>
<p></p>
      <Box>
      <Accordion>
      <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Previous orders</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <OrdersTable />
        </AccordionDetails>
      </Accordion>
      </Box>  
    </Box>
  );
}

export default MainPage;
