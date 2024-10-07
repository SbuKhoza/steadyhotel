import React, { useState } from 'react';
import { TextField, Popper, List, ListItem, ListItemText, Paper, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const mockData = [
  { id: 1, label: 'Home' },
  { id: 2, label: 'Profile' },
  { id: 3, label: 'Settings' },
  { id: 4, label: 'Dashboard' },
  { id: 5, label: 'Help' },
  { id: 6, label: 'Logout' },
];

function Search() {
  const [query, setQuery] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [results, setResults] = useState([]);

  const handleSearch = (event) => {
    const value = event.target.value;
    setQuery(value);
    
    // Filter the data based on the query
    const filteredResults = mockData.filter(item =>
      item.label.toLowerCase().includes(value.toLowerCase())
    );
    
    setResults(filteredResults);
    setAnchorEl(event.currentTarget); // Set the anchor for the Popper
  };

  const handleClose = () => {
    setResults([]);
    setAnchorEl(null);
  };

  const open = Boolean(results.length && anchorEl);

  return (
    <div>
      <TextField
        variant="outlined"
        size="small"
        placeholder="Search..."
        value={query}
        onChange={handleSearch}
        onBlur={handleClose}
        sx={{
          width: '250px', // Adjust the width to your preference
          borderRadius: '4px', // Slightly rounded corners
          padding: '40px', // Padding around the input
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          style: {
            height: '32px', // Reduce the height of the input
            padding: '4px 8px', // Reduce internal padding for a more compact look
          },
        }}
      />

      <Popper open={open} anchorEl={anchorEl} placement="bottom-start">
        <Paper style={{ width: anchorEl ? anchorEl.clientWidth : undefined }}>
          <List>
            {results.map((result) => (
              <ListItem button key={result.id} onClick={() => alert(`Navigating to ${result.label}`)}>
                <ListItemText primary={result.label} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Popper>
    </div>
  );
}

export default Search;
