import React from 'react';
import { Select, MenuItem, FormControl, InputLabel, Stack, ThemeProvider, OutlinedInput } from '@mui/material';
import { muiTheme } from '../../../Utils/index';

const CustomSelect = ({ label, options, value, onChange, name, error, disabled, placeholder }) => {
    return (
        <ThemeProvider theme={muiTheme}>
            <Stack>
                {label && <InputLabel size='15px'>{label}</InputLabel>}
                <FormControl 
                    variant="outlined" 
                    className="w-full" 
                    fullWidth 
                    error={error} 
                    disabled={disabled}
                >
                    <Select
                        value={value}
                        onChange={onChange}
                        input={<OutlinedInput />}
                        placeholder={placeholder}
                        label={label}
                        name={name}
                        className="font-medium text-sm h-10" // Tailwind classes for select input
                        fullWidth
                        displayEmpty
                        style={{color:'#808080'}}
                    >
                        <MenuItem value="" disabled>
                            {placeholder}
                        </MenuItem>
                        {options.map((option, index) => (
                            <MenuItem key={index} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Stack>
        </ThemeProvider>
    );
};

export default CustomSelect;
