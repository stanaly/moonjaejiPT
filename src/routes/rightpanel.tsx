import { Box, IconButton, Badge, Avatar } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";

export default function RightPanel() {
  const SmallAvatar = (props: any) => (
    <Avatar
      sx={{
        width: "22px",
        height: "22px",
        border: "2px solid",
      }}
    />
  );

  return (
    <Box // right panel
      sx={{
        backgroundColor: "white",
        width: "250px",
        height: "100vh",
        display: "flex",
        position: "fixed",
        right: "0",
        justifyContent: "center",
      }}
    >
      <IconButton
        aria-label="share"
        sx={{ width: "56px", height: "56px", margin: "15px" }}
      >
        <ShareIcon sx={{ fontSize: "40px" }} />
      </IconButton>
      <IconButton sx={{ width: "56px", height: "56px", margin: "15px" }}>
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          badgeContent={
            <SmallAvatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /> // 소셜 이미지
          }
        >
          <Avatar
            alt="Travis Howard"
            src="/static/images/avatar/1.jpg"
            sx={{ fontSize: "30px", width: "56px", height: "56px" }}
          />
        </Badge>
      </IconButton>
    </Box>
  );
}
