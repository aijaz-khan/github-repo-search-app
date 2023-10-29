import React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';

interface Repository {
  id: number;
  full_name: string;
  html_url: string;
}

interface RepositoryListProps {
  repositories: Repository[];
}

const limitDescriptionLength = (description, maxLength) => {
  if (description && description.length > maxLength) {
    return description.slice(0, maxLength) + '...';
  }
  return description;
};

const RepositoryList: React.FC<RepositoryListProps> = ({repositories}) => {
  return (
    <>
      <List>
        {repositories.map((repository) => (
          <Paper key={repository.id} elevation={3} style={{margin: '16px'}}>
            <ListItem>
              <ListItemText>
                <Typography variant="h4">
                  <Link href={repository.html_url} target="_blank" rel="noopener noreferrer">
                    {repository.name}
                  </Link>
                </Typography>
                <Typography>
                  <strong>Full Name:</strong> {repository.full_name}
                </Typography>
                <Typography>
                  <strong>Description:</strong> {limitDescriptionLength(repository.description, 500)}
                </Typography>
                <Typography>
                  <strong>Owner:</strong> {repository.owner.login}
                </Typography>
                <Typography>
                  <strong>Private:</strong> {repository.private ? 'Yes' : 'No'}
                </Typography>
              </ListItemText>
              <img
                src={repository.owner.avatar_url}
                alt="Owner Avatar"
                style={{width: '100px'}}
              />
            </ListItem>
          </Paper>
        ))}
      </List>
    </>
  );
};

export default RepositoryList;
