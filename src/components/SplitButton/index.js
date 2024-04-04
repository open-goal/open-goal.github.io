import * as React from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import { ChevronDownIcon } from "@primer/octicons-react";

export default function SplitButton({
  isLoading,
  isDisabled,
  primaryButtonLabel,
  primaryButtonURL,
  secondaryButtonLabels,
  secondaryButtonUrls,
}) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleMenuItemClick = (event, index) => {
    console.log(secondaryButtonUrls[index]);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  return (
    <React.Fragment>
      <ButtonGroup
        variant="contained"
        ref={anchorRef}
        aria-label="Download button group with a nested menu for other download options"
        disabled={isDisabled}
      >
        <LoadingButton
          loading={isLoading}
          onClick={(event) => {
            // todo
          }}
          sx={{fontFamily: 'Roboto Mono',
            backgroundColor: '#f77223',
            color: 'black',
            fontSize: '1em',
            padding: '0.5em',}}
        >
          {isDisabled ? "Downloads Unavailable" : primaryButtonLabel}
        </LoadingButton>
        <Button
          size="small"
          aria-controls={open ? "split-button-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-label="other download options"
          aria-haspopup="menu"
          onClick={handleToggle}
          sx={{fontFamily: 'Roboto Mono',
            backgroundColor: '#f77223',
            color: 'black',
            fontSize: '1em',
            padding: '0.5em',}}
        >
          <ChevronDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {secondaryButtonLabels.map((option, index) => (
                    <MenuItem
                      key={option}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
}
