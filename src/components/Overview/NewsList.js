import React from 'react';

import {
  LoadingScreen,
  DarkTitle,
  DefaultImage as MyDefault,
} from '../CommonComponents';
import { createMuiTheme } from '@material-ui/core/styles';

import {
  Paper,
} from '@material-ui/core';
import styled from 'styled-components';
const theme = createMuiTheme();

const List = styled.div`
  width: 100%;
  margin-top: 30px;
`;

const ListItem = styled(Paper)`
  display: flex;
  padding: ${theme.spacing(3)}px;
  margin-bottom: ${theme.spacing(3)}px;
  align-items: center;
  justify-content: flex-start;
`;

const NewsDescription = styled.p`
  padding-top: ${theme.spacing(3)}px;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 90%;
`;

const Image = styled.img`
  width: 150px;
  height: 100%;
  margin-right: 30px;
`;

const DefaultImage = styled(MyDefault)`
  width: 150px;
  height: 100%;
  margin-right: 30px;
`;


const NewsList = ({ search, news }) => {
  console.log(news);
  let newsList = [];
  search = search.trim().toLowerCase();
  if (search !== '') {
    newsList = news.filter((article) => {
      return article.title.toLowerCase().match(search);
    });
  } else {
    newsList = [...news];
  }

  if (news.length === 0) {
    return <LoadingScreen />
  }

  return (
    <List>
      {
        newsList.map(news => (
          <ListItem key={news['_id']}>
            {
              (news.photo && news.photo.length > 0)
                ? <Image
                  src={news.photo[0]}
                />
                : <DefaultImage />
            }
            <TextWrapper>
              <DarkTitle variant="h6" align="left">
                {news.title}
              </DarkTitle>
              <NewsDescription>
                {news.desc}
              </NewsDescription>
            </TextWrapper>
          </ListItem>
        ))
      }
    </List>
  );
};

export default NewsList;
