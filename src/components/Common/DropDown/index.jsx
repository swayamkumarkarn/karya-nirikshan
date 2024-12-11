import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect({ heading, data, onChange }) {
  const [selectedValue, setSelectedValue] = React.useState('');

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    if (onChange) onChange(value); // Call the parent handler
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="dynamic-select-label">{heading}</InputLabel>
        <Select
          labelId="dynamic-select-label"
          id="dynamic-select"
          value={selectedValue}
          label={heading}
          onChange={handleChange}
        >
          {data && data.length > 0 ? (
            data.map((item, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>No options available</MenuItem>
          )}
        </Select>
      </FormControl>
    </Box>
  );
}


