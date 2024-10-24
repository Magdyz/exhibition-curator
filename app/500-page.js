import { Container, Typography, Button } from "@mui/material";
import Link from "next/link";

export default function Custom500() {
  return (
    <Container style={{ textAlign: "center", marginTop: "50px" }}>
      <Typography variant="h2" gutterBottom>
        500 - Server-side Error
      </Typography>
      <Typography variant="body1" paragraph>
        Something went wrong on our end. Please try again later.
      </Typography>
      <Button variant="contained" color="primary">
        <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
          Go to Homepage
        </Link>
      </Button>
    </Container>
  );
}
