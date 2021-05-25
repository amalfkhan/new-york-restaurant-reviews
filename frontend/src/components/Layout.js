import React from 'react';
import { useHistory, useLocation } from 'react-router';
import { makeStyles, Drawer, Typography, List, ListItem, ListItemIcon, ListItemText, AppBar, Toolbar } from "@material-ui/core"
import CasinoIcon from '@material-ui/icons/Casino';
import SearchIcon from '@material-ui/icons/Search';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import EmojiFoodBeverageIcon from '@material-ui/icons/EmojiFoodBeverage';

const drawerWidth = 240;
const drawerItems = [
  {
    text: "Search",
    icon: <SearchIcon color="secondary" />,
    path: "/"
  },
  {
    text: "Featured Quick Bite",
    icon: <EmojiFoodBeverageIcon color="secondary" />,
    path: "/restaurants/5eb3d669b31de5d588f4832e"
  },
  {
    text: "Featured Restaurant",
    icon: <RestaurantIcon color="secondary" />,
    path: "/restaurants/5eb3d668b31de5d588f42e34"
  },
  {
    text: "I'm Feeling Lucky",
    icon: <CasinoIcon color="secondary" />,
    path: "/restaurants/lucky"
  },
];

const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: "flex",
    },
    pageContainer: {
      background: "#f9f9f9",
      width: "100%"
    },
    drawer: {
      width: drawerWidth
    },
    drawerPaper: {
      width: drawerWidth
    },
    active: {
      background: "#f4f4f4",
      "&.MuiListItem-root.Mui-disabled": {
        opacity: 1
      }
    },
    title: {
      padding: theme.spacing(2),
    }
  }
});

const Layout = ({ children }) => {
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* app bar */}


      {/* side drawer */}
      <Drawer 
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        classes={{ paper: classes.drawerPaper }}
      >
        <div>
          <Typography className={classes.title} variant="h5">New York Bites</Typography>
        </div>

        <List>
          {drawerItems.map((item, index) => (
            <ListItem 
              button
              disabled={location.pathname === item.path ? true : false}
              key={index}
              className={location.pathname === item.path ? classes.active : null}
              onClick={() => history.push(item.path)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>

      </Drawer>
      
      <div className={classes.pageContainer}>
        { children }
      </div>
    </div>
  );
}

export default Layout;