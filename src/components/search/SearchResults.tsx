import { Box, Typography, CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import { SongsApiResponse } from "../../constants/interfaces/api.responses";
import { Song } from "../../constants/interfaces/song.interface";
import { ViewToggle } from "../buttons/ViewToggle";
import { SongList } from "../player/SongList";
import { useLayout } from "../../context/layout/LayoutContext";
import axiosInstance from "../../util/axios/axiosInstance";

export const SearchResult = () => {
  const { searchQuery } = useLayout();
  const [songResult, setSongResult] = useState<Song[]>([]);
  const [suggestions, setSuggestions] = useState<Song[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get<SongsApiResponse>(
          `/api/search/songs?query=${searchQuery}`
        );
        setSongResult(response.data.data.results);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    const fetchSuggestions = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(
          "https://jiosaavnapi-server.vercel.app/api/songs/yDeAS8Eh/suggestions?limit=100"
        );
        setSuggestions(response.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    if (searchQuery) {
      fetchSongs();
    } else {
      setSongResult([]); // Clear search results when there's no query
      if (suggestions.length === 0) {
        fetchSuggestions(); // Fetch suggestions if they haven’t been loaded yet
      }
    }
  }, [searchQuery, suggestions.length]);

  return (
    <Box sx={{ height: "100%", width: "100%", overflowY: "auto" }}>
      {/* Display appropriate header based on the search query */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginX: 1,
          paddingX: 0.5,
        }}
      >
        <Typography variant="h6" sx={{ fontStyle: "italic" }}>
          {searchQuery ? `Results for ${searchQuery.trim()}` : "Suggestions"}
        </Typography>
        {searchQuery && <ViewToggle />}
      </Box>

      {/* Show songResult if searchQuery exists; otherwise show suggestions */}
      <SongList songs={searchQuery ? songResult : suggestions} />

      {/* Loading animation */}
      {loading && (
        <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column" mt={2}>
          <CircularProgress color="primary" />
          <Typography variant="body2" mt={1}>Loading...</Typography>
        </Box>
      )}
    </Box>
  );
};
