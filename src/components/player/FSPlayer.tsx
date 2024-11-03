import { Box, Typography } from "@mui/material";
import { Seekbar } from "./Seekbar";
import { PlayerControls } from "./PlayerControls";
import { usePlayer } from "../../context/player/PlayerContext";
import he from "he";
import { formatSecondsToTime } from "../../util/helperFunctions";

export const FSPlayer = () => {
  const {
    currentSong,
    currentTime,
    duration,
    // getNextSong
  } = usePlayer();

  // const nextSong = getNextSong();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        height: "100%",
        width: "100%",
        padding: 2,
        borderRadius: 2,
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
        transition: "all 0.8s ease",
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          maxHeight: "50dvh",
          width: "100%",
        }}
      >
        <img
          src={currentSong?.image[2].url}
          alt={currentSong?.name}
          style={{
            maxWidth: "90%",
            maxHeight: "100%",
            objectFit: "contain",
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          height: 150,
          maxWidth: "100%",
        }}
      >
        {/* Song Title */}
        <Typography
          variant="h4"
          fontWeight={600}
          sx={{
            display: "-webkit-box",
            overflow: "hidden",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            textOverflow: "ellipsis",
          }}
        >
          {(currentSong && he.decode(currentSong.name)) || "No Song Playing"}
        </Typography>

        {/* Artist Names */}
        <Typography
  variant="h6"
  color="text.secondary"
  sx={{
    display: "-webkit-box",
    overflow: "hidden",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 2,
    textOverflow: "ellipsis",
  }}
>
  {currentSong?.artists?.primary?.length 
    ? currentSong.artists.primary.map((artist) => he.decode(artist.name)).join(", ")
    : 'Unknown Artist'}
</Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Box sx={{ display: "flex", width: "100%", boxSizing: "border-box" }}>
          <Seekbar />
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Typography variant="body2" fontWeight={600} color="text.secondary">
            {formatSecondsToTime(currentTime)}
          </Typography>
          <Typography variant="body2" fontWeight={600} color="text.secondary">
            {formatSecondsToTime(duration)}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <PlayerControls />
      </Box>
    </Box>
  );
};
