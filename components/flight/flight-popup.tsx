import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { FlightCard, FlightFooter } from ".";
import { FlightInfo, Trip } from "@objects";

type Props = {
  flightInfo: FlightInfo | null;
};
function FlightPopup({ flightInfo }: Props) {
  const [outboundOpen, setOutboundOpen] = useState(true);
  const [currentTrip, setCurrentTrip] = useState<Trip | null>();

  useEffect(() => {
    if (flightInfo) {
      if (outboundOpen) setCurrentTrip(flightInfo.outboundTrip);
      else setCurrentTrip(flightInfo.inboundTrip);
    }
  }, [flightInfo, outboundOpen]);

  if (!flightInfo || !currentTrip) return null;

  return (
    <Box
      sx={{
        position: "absolute",
        left: 0,
        bottom: 0,
        backgroundColor: "rgba(255, 255, 255, 0.15)",
        backdropFilter: "blur(15px)",
        width: "100%",
        height: { xs: "200px", md: "60%" },
        borderRadius: "12px",
        p: { md: 3, xs: 1 },
        gap: { md: 3, xs: 1 },
        display: { xs: "none", md: "flex" },
        flexDirection: "column",
        overflowY: "scroll",
      }}
    >
      <Box>
        <Button
          variant="text"
          sx={{ color: outboundOpen ? "#372b25" : "gray" }}
          onClick={() => setOutboundOpen(true)}
        >
          Outbound
        </Button>
        <Button
          variant="text"
          sx={{ color: !outboundOpen ? "#372b25" : "gray" }}
          onClick={() => setOutboundOpen(false)}
        >
          Inbound
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          justifyContent: "space-between",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        {currentTrip.flights.map((trip, i) => (
          <FlightCard
            key={i}
            departure={trip.departure}
            destination={trip.destination}
            airport={trip.airport}
            arrival={trip.arrival}
          />
        ))}
      </Box>

      <FlightFooter airline={currentTrip.airline} cost={currentTrip.cost} />
    </Box>
  );
}

export default FlightPopup;
