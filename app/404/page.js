import { Typography, Container, Button } from "@mui/material";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <Container style={{ textAlign: "center", padding: "50px" }}>
      <Typography variant="h2" color="error" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant="body1" gutterBottom>
        Sorry, the page you are looking for does not exist.
      </Typography>
      <Link href="/" passHref>
        <Button variant="contained" color="primary">
          Go Back to Home
        </Button>
      </Link>
    </Container>
  );
}
