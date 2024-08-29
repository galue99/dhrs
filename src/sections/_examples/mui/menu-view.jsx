import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

import { paths } from 'src/routes/paths';

import Iconify from 'src/components/iconify';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import ComponentHero from 'src/sections/_examples/component-hero';

import ComponentBlock from '../component-block';

// ----------------------------------------------------------------------

const OPTIONS = [
  'Show some love to Material-UI',
  'Show all notification content',
  'Hide sensitive notification content',
  'Hide all notification content',
];

const OPTIONS_MAXHEIGHT = [
  'None',
  'Atria',
  'Callisto',
  'Dione',
  'Ganymede',
  'Hangouts Call',
  'Luna',
  'Oberon',
  'Phobos',
  'Pyxis',
  'Sedna',
  'Titania',
  'Triton',
  'Umbriel',
];

// ----------------------------------------------------------------------

export default function MenuView() {
  const [selectedIndex, setSelectedIndex] = useState(1);

  const [isOpen, setOpen] = useState(null);

  const [isOpenList, setOpenList] = useState(null);

  const [isOpenMaxHeight, setOpenMaxHeight] = useState(null);

  const handleClick = useCallback((event) => {
    setOpenMaxHeight(event.currentTarget);
  }, []);

  const handleClickListItem = useCallback((event) => {
    setOpenList(event.currentTarget);
  }, []);

  const handleMenuItemClick = useCallback((event, index) => {
    setSelectedIndex(index);
    setOpenList(null);
  }, []);

  const handleOpen = useCallback((event) => {
    setOpen(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(null);
  }, []);

  const handleMaxHeightClose = useCallback(() => {
    setOpenMaxHeight(null);
  }, []);

  return (
    <>
      <ComponentHero>
        <CustomBreadcrumbs
          heading="Menu"
          links={[
            {
              name: 'Components',
              href: paths.components,
            },
            { name: 'Menu' },
          ]}
          moreLink={['https://mui.com/components/menus']}
        />
      </ComponentHero>

      <Container sx={{ my: 10 }}>
        <Box
          gap={3}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            md: 'repeat(3, 1fr)',
          }}
        >
          <ComponentBlock title="Simple">
            <Button variant="outlined" onClick={handleOpen}>
              Open Menu
            </Button>
            <Menu id="simple-menu" anchorEl={isOpen} onClose={handleClose} open={Boolean(isOpen)}>
              {['Logout'].map((option) => (
                <MenuItem key={option} selected={option === 'Profile'} onClick={handleClose}>
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </ComponentBlock>

          <ComponentBlock title="Selected">
            <List component="nav" aria-label="Device settings">
              <ListItemButton
                aria-haspopup="true"
                aria-controls="lock-menu"
                aria-label="when device is locked"
                onClick={handleClickListItem}
              >
                <ListItemText primary="When device is locked" secondary={OPTIONS[selectedIndex]} />
              </ListItemButton>
            </List>

            <Menu
              id="lock-menu"
              anchorEl={isOpenList}
              onClose={handleClose}
              open={Boolean(isOpenList)}
            >
              {OPTIONS.map((option, index) => (
                <MenuItem
                  key={option}
                  disabled={index === 0}
                  selected={index === selectedIndex}
                  onClick={(event) => handleMenuItemClick(event, index)}
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </ComponentBlock>

          <ComponentBlock title="Max height">
            <IconButton
              aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton>

            <Menu
              id="long-menu"
              anchorEl={isOpenMaxHeight}
              onClose={handleMaxHeightClose}
              open={Boolean(isOpenMaxHeight)}
              slotProps={{
                paper: {
                  sx: {
                    width: '20ch',
                    maxHeight: 48 * 4.5,
                  },
                },
              }}
            >
              {OPTIONS_MAXHEIGHT.map((option) => (
                <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleMaxHeightClose}>
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </ComponentBlock>
        </Box>
      </Container>
    </>
  );
}
