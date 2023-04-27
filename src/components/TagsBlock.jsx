import React from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import TagIcon from "@mui/icons-material/Tag";
import ListItemText from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";

import { SideBlock } from "./SideBlock";

export const TagsBlock = ({
  handleTagSelected,
  tagSelected,
  items,
  isLoading = true,
}) => {
  return (
    <SideBlock title='Tags'>
      <List>
        {(isLoading ? [...Array(5)] : [...new Set(items)]).map((name, i) => (
          <ListItem
            key={i}
            disablePadding
            onClick={() => handleTagSelected(name)}
          >
            <ListItemButton selected={tagSelected === name ? true : false}>
              <ListItemIcon>
                <TagIcon />
              </ListItemIcon>
              {isLoading ? (
                <Skeleton width={100} />
              ) : (
                <ListItemText primary={name} />
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </SideBlock>
  );
};
