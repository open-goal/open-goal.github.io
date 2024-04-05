import * as React from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import MenuItem from "@mui/material/MenuItem";
import Select from '@mui/material/Select';

export default function SplitButton({
  isLoading,
  isDisabled,
  primaryButtonLabel,
  primaryButtonUrl,
  secondaryButtonLabels,
  secondaryButtonUrls,
}) {
  const handleMenuItemClick = (event, index) => {
    window.location.href = secondaryButtonUrls[index];
  };

  return (
    <React.Fragment>
      <LoadingButton
          loading={isLoading}
          onClick={(event) => {
            window.location.href = primaryButtonUrl;
          }}
          sx={{fontFamily: 'Roboto Mono',
            backgroundColor: '#f77223',
            color: 'black',
            padding: '0.5em',
            fontWeight: 600,
            fontSize: '1em',
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            ':hover': {
              backgroundColor: 'rgb(247, 92, 0)',
            }  
          
          }}
        >
          {isDisabled ? "Downloads Unavailable" : primaryButtonLabel}
        </LoadingButton>
      <Select
        disabled={isLoading || isDisabled}
        inputProps={{
          MenuProps: {
            PaperProps: {
              sx: {
                 backgroundColor: 'rgb(26, 25, 28)'
              }
            }
          }
        }}
        sx={{
          backgroundColor: '#f77223',
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          marginRight: '1em',
          ':hover': {
            backgroundColor: 'rgb(247, 92, 0)',
          },
          "&.MuiOutlinedInput-root": {
            "& div.MuiSelect-select": {
              paddingRight: '24px'
            },
            "&:hover fieldset": {
              borderColor: 'rgba(0, 0, 0, 0.23)'
            },
            "&.Mui-focused fieldset": {
              borderColor: 'rgba(0, 0, 0, 0.23)'
            }
          }
        }}
      >
        {secondaryButtonLabels.map((option, index) => {
          console.log(`${primaryButtonUrl} === ${secondaryButtonUrls[index]}`);
          if (secondaryButtonUrls[index] === primaryButtonUrl) {
            return null;
          }
          return (<MenuItem
            key={option}
            onClick={(event) => handleMenuItemClick(event, index)}
            sx={{fontFamily: 'Roboto Mono', color: '#f77223', fontSize: '1em',fontWeight: 600,
            fontSize: '1em'}}
          >
            {option}
          </MenuItem>)
        })}
      </Select>
    </React.Fragment>
  );
}
