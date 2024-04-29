import EventList from '../EventsList/EventsList';
import TopToolbar from '../Toolbar/Toolbar';
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  let navigate = useNavigate();

  return (
    <div className="HomePage">
      <TopToolbar 
      onFeedClick={() => navigate('/feed')} 
      onHomeClick={() => navigate('/')} 
      />
    
    </div>
  );
}

export default HomePage;