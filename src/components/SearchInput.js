import React, { useState } from "react";

import { IconButton, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function SearchInput({ handleSubmit }) {
  const [searchQuery, setSearchQuery] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(searchQuery);
  };

  return (
    <form onSubmit={onSubmit}>
      <TextField
        value={searchQuery}
        placeholder="Tên người dùng"
        onChange={(event) => setSearchQuery(event.target.value)}
        sx={{
          width: "90%",
          '& .css-1c46n0r-MuiInputBase-root-MuiOutlinedInput-root': {
            borderRadius: "50px",
          }
        }}
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton
                type="submit"
                color="primary"
                aria-label="Tên người dùng"
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
}

export default SearchInput;
