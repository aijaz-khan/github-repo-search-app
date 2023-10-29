import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import RepositoryList from './RepositoryList';
import { makeStyles } from '@mui/styles';
import Pagination from '@mui/material/Pagination';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: '20px',
  },
  header: {
    fontSize: '36px',
    fontWeight: 'bold',
    marginBottom: '16px',
  },
  searchContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    maxWidth: '4000px',
    width: '80%',
    padding: '16px',
    borderRadius: '8px',
    backgroundColor: '#f5f5f5',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  searchButton: {
    width: '100%',
  },
  loading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '150px',
  },
  results: {
    marginTop: '16px',
    width: '80%'
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '16px',
  }
}));

const RepositoriesPage: React.FC = () => {
  const classes = useStyles();
  const [searchText, setSearchText] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [totalPages, setTotalPages] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/repositories?search_term=${searchText}&page=${page}`
      );

      console.log('Tjhsakljdhalkjhdskjashdkjashdlkjahskldjhaslkjdhaskljhdkalsjh')
      console.log(response)
      console.log('Tjhsakljdhalkjhdskjashdkjashdlkjahskldjhaslkjdhaskljhdkalsjh')
      if (response.ok) {
        const data = await response.json();
        setRepositories(data.repositories);
        setTotalPages(data.total_pages);
      }
    } catch (error) {
      console.log(error)
      console.log(error)
      console.log(error)
      console.log(error)
      console.log(error)
      console.error('Error fetching data: ', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (page !== 1) {
      handleSearch();
    }
  }, [page]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className={classes.root}>
      <Typography variant="h2" className={classes.header}>
        GitHub Repository Search
      </Typography>
      <Paper className={classes.searchContainer}>
        <TextField
          label="Search for repositories"
          variant="outlined"
          fullWidth
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          disabled={loading}
          className={classes.searchButton}
        >
          Search
        </Button>
      </Paper>
      {loading && (
        <div className={classes.loading}>
          <CircularProgress color="primary" />
        </div>
      )}
      {repositories && repositories.length > 0 && !loading && (
        <div className={classes.results}>
          <RepositoryList repositories={repositories} />
        </div>
      )}
      {totalPages > 1  && (
        <div className={classes.pagination}>
          <Pagination
            count={totalPages }
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </div>
      )}
    </div>
  );
};

export default RepositoriesPage;
