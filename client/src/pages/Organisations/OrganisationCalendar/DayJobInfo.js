import React from "react";
import styled from "styled-components";
import { spacing } from "@material-ui/system";
import { List, ListItem, ListItemText } from '@material-ui/core';



const Wrapper = styled.div`
  /* padding: ${props => props.theme.spacing(6)}px;
  text-align: center; */
  background: #f8f9fd;
  width: 100%;
  flex-grow: 1;
/* 
  ${props => props.theme.breakpoints.up("md")} {
    padding: ${props => props.theme.spacing(10)}px;
  } */
`;

function DayJobInfo({events}) {
  return (
    <Wrapper>
        <List>
          {!!events.length 
            && events.map(event => {
              return (
                <ListItem key={event.id}>{event.title}
                    <ListItemText inset primary={events.title} />
                </ListItem>
              )
            })
          }
        </List>
    </Wrapper>
  );
}

export default DayJobInfo;