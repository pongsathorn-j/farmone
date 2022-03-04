import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import {
  ExpandLess,
  ExpandMore,
  Home,
  CategoryRounded,
  Inbox,
} from "@mui/icons-material";
import StarBorder from "@mui/icons-material/StarBorder";
import { useRouter } from "next/router";
import Link from "next/link";

const ListMenu = ({ menuName }) => {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  const activeRoute = (routeName, currentRoute) => {
    return routeName === currentRoute ? true : false;
  };

  const routes = [
    {
      id: 1,
      label: "Home",
      path: "/",
      icon: Home,
      subItem: [],
    },
    {
      id: 2,
      label: "About",
      path: "/about",
      icon: CategoryRounded,
      subItem: [],
    },
  ];

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          {menuName}
        </ListSubheader>
      }
    >
      {routes.map((item, index) => (
        <Link
          href={item.path}
          style={{ textDecoration: "none", color: "black" }}
          key={index}
        >
          <ListItemButton selected={activeRoute(item.path, router.pathname)}>
            <ListItemIcon>
              <item.icon />
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        </Link>
      ))}

      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <Inbox />
        </ListItemIcon>
        <ListItemText primary="Inbox" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Stared" />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
};

export default ListMenu;
