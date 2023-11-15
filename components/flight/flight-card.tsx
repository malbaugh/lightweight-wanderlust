import { Box, Typography } from "@mui/material";
import InboundFlightIcon from "@mui/icons-material/FlightLandOutlined";
import OutboundFlightIcon from "@mui/icons-material/FlightTakeoffOutlined";

type Props = {
  departure: boolean;
  destination: string;
  airport: string;
  arrival: string;
};
function FlightCard({
  departure = true,
  destination,
  airport,
  arrival,
}: Props) {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(arrival));

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {departure ? (
        <OutboundFlightIcon sx={{ color: "#372b25" }} />
      ) : (
        <InboundFlightIcon sx={{ color: "#372b25" }} />
      )}
      <Box sx={{ display: "flex", gap: 1 }}>
        <Typography variant="h5" color="#372b25">
          {destination}
        </Typography>
        <Typography variant="h5" color="gray">
          {airport}
        </Typography>
      </Box>
      <Typography variant="h6" color="gray">
        {formattedDate}
      </Typography>
      <Typography variant="h6" color="gray">
        {new Date(arrival).toLocaleTimeString()}
      </Typography>
    </Box>
  );
}

export default FlightCard;
