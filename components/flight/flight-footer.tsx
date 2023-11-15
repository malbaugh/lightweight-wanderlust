import { Box, Typography } from "@mui/material";
import { type } from "os";

type Props = {
  airline: string;
  cost: string;
};
function FlightFooter({ airline, cost }: Props) {
  return (
    <Box
      sx={{
        display: { xs: "none", sm: "flex" },
        justifyContent: "space-between",
      }}
    >
      <Typography variant="h5" color="#372b25">
        {airline}
      </Typography>
      <Typography variant="h5" color="gray">
        {cost}
      </Typography>
    </Box>
  );
}

export default FlightFooter;
