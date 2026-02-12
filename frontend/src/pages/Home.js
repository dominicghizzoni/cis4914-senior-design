import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import VideoUploader from '../components/VideoUploader';

const Home = () => {
  const teams = [
    {
      id: '1',
      name: 'Team 1',
      recentGames: [
        { id: '1', opponent: 'Team 2', date: '2026-01-20' },
        { id: '2', opponent: 'Team 3', date: '2026-01-15' },
        { id: '3', opponent: 'Team 4', date: '2026-01-08' },
      ]
    },
    {
      id: '2',
      name: 'Team 2',
      recentGames: [
        { id: '1', opponent: 'Team 1', date: '2026-01-20' },
        { id: '2', opponent: 'Team 6', date: '2026-01-12' },
      ]
    }
  ];

  const formatDate = (dateStr) => {
    const [year, month, day] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="home-container">
      <h1>Dashboard</h1>
      
      <div className="teams-list">
        {teams.map(team => (
          <div key={team.id} className="team-card">
            <Link to={`/team/${team.id}`} className="team-card-header">
              <h2>{team.name}</h2>
              <i className="fas fa-chevron-right"></i>
            </Link>
            
            <div className="recent-games">
              {team.recentGames.length > 0 ? (
                team.recentGames.slice(0, 3).map(game => (
                  <Link
                    key={game.id}
                    to={`/team/${team.id}/game/${game.id}`}
                    className="recent-game"
                  >
                    <span className="opponent">vs {game.opponent}</span>
                    <span className="date">{formatDate(game.date)}</span>
                  </Link>
                ))
              ) : (
                <p className="no-games">No recent games</p>
              )}
            </div>
          </div>
        ))}
        <VideoUploader />
      </div>
    </div>
  );
};

export default Home;
