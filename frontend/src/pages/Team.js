import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Modal from '../components/Modal';
import './Team.css';

const Team = () => {
  const { teamId } = useParams();
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showAddGameModal, setShowAddGameModal] = useState(false);
  const [inviteTab, setInviteTab] = useState('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [gameDate, setGameDate] = useState('');
  const [opponent, setOpponent] = useState('');

  const team = {
    id: teamId,
    name: 'Team 1',
    inviteCode: 'TEAM-1'
  };

  const games = [
    { id: '1', opponent: 'Team 2', date: '2026-01-20', month: 'January 2026' },
    { id: '2', opponent: 'Team 3', date: '2026-01-15', month: 'January 2026' },
    { id: '3', opponent: 'Team 4', date: '2026-01-08', month: 'January 2026' },
    { id: '4', opponent: 'Team 5', date: '2025-12-18', month: 'December 2025' },
    { id: '5', opponent: 'Team 6', date: '2025-12-10', month: 'December 2025' },
  ];

  const groupedGames = games.reduce((acc, game) => {
    if (!acc[game.month]) acc[game.month] = [];
    acc[game.month].push(game);
    return acc;
  }, {});

  const handleAddGame = () => {
    setShowAddGameModal(false);
    setGameDate('');
    setOpponent('');
  };

  const handleInviteSearch = () => {
  };

  const formatDate = (dateStr) => {
    const [year, month, day] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="team-page">
      <div className="team-header">
        <h1 className="team-name">{team.name}</h1>
        <button className="invite-btn" onClick={() => setShowInviteModal(true)}>
          <i className="fas fa-user-plus"></i>
        </button>
      </div>

      <div className="games-list">
        <div className="add-game-card" onClick={() => setShowAddGameModal(true)}>
            <i className="fas fa-plus"></i>
            <span>Add Game</span>
        </div>
        {Object.entries(groupedGames).map(([month, monthGames]) => (
          <div key={month} className="month-group">
            <h3 className="month-header">{month}</h3>
            
            {monthGames.map(game => (
              <Link
                key={game.id}
                to={`/team/${teamId}/game/${game.id}`}
                className="game-card"
              >
                <div className="game-info">
                  <span className="game-opponent">vs {game.opponent}</span>
                  <span className="game-date">{formatDate(game.date)}</span>
                </div>
                <i className="fas fa-chevron-right"></i>
              </Link>
            ))}
          </div>
        ))}
      </div>

      <Modal
        isOpen={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        title="Invite to Team"
      >
        <div className="invite-tabs">
          <button
            className={`invite-tab ${inviteTab === 'search' ? 'active' : ''}`}
            onClick={() => setInviteTab('search')}
          >
            Search User
          </button>
          <button
            className={`invite-tab ${inviteTab === 'code' ? 'active' : ''}`}
            onClick={() => setInviteTab('code')}
          >
            Invite Code
          </button>
        </div>

        {inviteTab === 'search' ? (
          <div className="invite-search">
            <label className="modal-label">Username</label>
            <input
              type="text"
              className="modal-input"
              placeholder="Enter username..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="modal-btn modal-btn-primary" onClick={handleInviteSearch}>
              Send Invite
            </button>
          </div>
        ) : (
          <div className="invite-code-section">
            <div className="invite-code-box">
              <p style={{ marginBottom: '5px', color: '#aaa', fontSize: '12px' }}>Share this code</p>
              <span className="invite-code">{team.inviteCode}</span>
            </div>
            <div className="qr-placeholder">
              QR Code
            </div>
            <button className="modal-btn modal-btn-secondary">
              <i className="fas fa-copy" style={{ marginRight: '8px' }}></i>
              Copy Code
            </button>
          </div>
        )}
      </Modal>

      <Modal
        isOpen={showAddGameModal}
        onClose={() => setShowAddGameModal(false)}
        title="Add New Game"
      >
        <label className="modal-label">Date</label>
        <input
          type="date"
          className="modal-input"
          value={gameDate}
          onChange={(e) => setGameDate(e.target.value)}
        />

        <label className="modal-label">Opponent</label>
        <input
          type="text"
          className="modal-input"
          placeholder="Team name..."
          value={opponent}
          onChange={(e) => setOpponent(e.target.value)}
        />

        <p style={{ fontSize: '12px', color: '#888', marginBottom: '15px' }}>
          <i className="fas fa-info-circle" style={{ marginRight: '5px', fontSize: '10px' }}></i>
          You can upload footage after creating the game
        </p>

        <button
          className="modal-btn modal-btn-primary"
          onClick={handleAddGame}
          disabled={!gameDate || !opponent}
        >
          Create Game
        </button>
      </Modal>
    </div>
  );
};

export default Team;
