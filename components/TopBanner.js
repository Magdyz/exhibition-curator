// TopBanner.js
import { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, IconButton, Badge } from "@mui/material";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

export default function TopBanner({ selectedArtworks }) {
  const [artworkCount, setArtworkCount] = useState(0);

  // Update artwork count when selectedArtworks changes
  useEffect(() => {
    setArtworkCount(selectedArtworks.length);
  }, [selectedArtworks]);

  // Scroll to 'Your Exhibition' section on basket click
  const handleBasketClick = () => {
    document
      .getElementById("yourExhibition")
      .scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AppBar
      position="fixed"
      color="primary"
      sx={{
        top: 0,
        width: "100%",
        zIndex: 1300,
        padding: 1,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "flex-end" }}>
        <IconButton color="inherit" onClick={handleBasketClick}>
          <Badge badgeContent={artworkCount} color="secondary">
            <ShoppingBasketIcon />
          </Badge>
        </IconButton>
        <Typography variant="h6" sx={{ marginLeft: 1 }}>
          Your Exhibition
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
