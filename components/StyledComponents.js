import { styled } from "@mui/system";
import { Button } from "@mui/material";

export const StyledButton = styled(Button)({
  borderRadius: "24px",
  textTransform: "none",
  padding: "8px 16px",
  width: "100%",
  fontSize: "16px",
  backgroundColor: "#6d597a",
  "&:hover": {
    backgroundColor: "#5a4b6e",
  },
});
