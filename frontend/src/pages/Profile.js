import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import { AuthContext } from '../context/AuthContext';
import useAuth from '../hooks/useAuth'
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@email.com');
  const [photoStatus, setPhotoStatus] = useState('Update your picture');
  const [passwordStatus, setPasswordStatus] = useState('Send a reset link');
  const [teams, setTeams] = useState([
    { name: 'Team 1', group: 'U12', role: 'Parent/Coach' },
    { name: 'Team 2', group: 'U10', role: 'Parent' }
  ]);

  const [kids, setKids] = useState([
    { name: 'Jake', team: 'Team 1', group: 'U12' },
    { name: 'Josie', team: 'Team 2', group: 'U10' }
  ]);

  const [modalType, setModalType] = useState(null);
  const [form, setForm] = useState({ primary: '', secondary: '', tertiary: '' });
  const [payload, setPayload] = useState(null);

  const openModal = (type, data = {}) => {
    setModalType(type);
    setPayload(data);

    switch (type) {
      case 'name':
        setForm({ primary: name, secondary: '', tertiary: '' });
        break;
      case 'email':
        setForm({ primary: email, secondary: '', tertiary: '' });
        break;
      case 'photo':
      case 'reset':
        setForm({ primary: '', secondary: '', tertiary: '' });
        break;
      case 'team': {
        const team = teams[data.index] || {};
        setForm({
          primary: team.name || '',
          secondary: team.group || '',
          tertiary: team.role || ''
        });
        break;
      }
      case 'kid': {
        const kid = kids[data.index] || {};
        setForm({
          primary: kid.name || '',
          secondary: kid.team || '',
          tertiary: kid.group || ''
        });
        break;
      }
      case 'add':
        setForm({ primary: 'team', secondary: '', tertiary: '' });
        break;
      default:
        setForm({ primary: '', secondary: '', tertiary: '' });
    }
  };

  const closeModal = () => {
    setModalType(null);
    setPayload(null);
    setForm({ primary: '', secondary: '', tertiary: '' });
  };

  const saveModal = () => {
    switch (modalType) {
      case 'name':
        if (form.primary.trim()) setName(form.primary.trim());
        break;
      case 'email':
        if (form.primary.trim()) setEmail(form.primary.trim());
        break;
      case 'photo':
        setPhotoStatus('Photo updated');
        break;
      case 'reset':
        setPasswordStatus('Reset link sent');
        break;
      case 'team': {
        if (payload?.index == null) break;
        const next = [...teams];
        next[payload.index] = {
          name: form.primary.trim() || next[payload.index].name,
          group: form.secondary.trim() || next[payload.index].group,
          role: form.tertiary.trim() || next[payload.index].role
        };
        setTeams(next);
        break;
      }
      case 'kid': {
        if (payload?.index == null) break;
        const next = [...kids];
        next[payload.index] = {
          name: form.primary.trim() || next[payload.index].name,
          team: form.secondary.trim() || next[payload.index].team,
          group: form.tertiary.trim() || next[payload.index].group
        };
        setKids(next);
        break;
      }
      case 'add': {
        if (form.primary === 'team') {
          if (!form.secondary.trim()) break;
          const group = form.tertiary.trim() || 'U12';
          setTeams([...teams, { name: form.secondary.trim(), group, role: 'Parent' }]);
        } else {
          if (!form.secondary.trim()) break;
          const group = form.tertiary.trim() || 'U10';
          setKids([...kids, { name: form.secondary.trim(), team: teams[0]?.name || 'Team', group }]);
        }
        break;
      }
      default:
        break;
    }
    closeModal();
  };

  const editName = () => openModal('name');
  const changePhoto = () => openModal('photo');
  const updateEmail = () => openModal('email');
  const sendReset = () => openModal('reset');
  const editTeam = (index) => openModal('team', { index });
  const editKid = (index) => openModal('kid', { index });
  const addChildOrTeam = () => openModal('add');

  const handleSignOut = () => {
    logout();
    navigate('/login');
  };

  const renderModal = () => {
    if (!modalType) return null;

    const titleMap = {
      name: 'Edit name',
      email: 'Update email',
      photo: 'Profile photo',
      reset: 'Password reset',
      team: 'Edit team',
      kid: 'Edit child',
      add: 'Add child / team'
    };

    return (
      <Modal isOpen={!!modalType} onClose={closeModal} title={titleMap[modalType] || 'Edit'}>
        {modalType === 'name' && (
          <>
            <label className="modal-label">Name</label>
            <input
              type="text"
              className="modal-input"
              value={form.primary}
              onChange={(e) => setForm({ ...form, primary: e.target.value })}
              autoFocus
            />
          </>
        )}

        {modalType === 'email' && (
          <>
            <label className="modal-label">Email</label>
            <input
              type="email"
              className="modal-input"
              value={form.primary}
              onChange={(e) => setForm({ ...form, primary: e.target.value })}
              autoFocus
            />
          </>
        )}

        {modalType === 'photo' && (
          <p className="value">Mark your photo as updated.</p>
        )}

        {modalType === 'reset' && (
          <p className="value">Send a reset link to {email}?</p>
        )}

        {modalType === 'team' && (
          <>
            <label className="modal-label">Team name</label>
            <input
              type="text"
              className="modal-input"
              value={form.primary}
              onChange={(e) => setForm({ ...form, primary: e.target.value })}
              autoFocus
            />
            <label className="modal-label">Age group / league</label>
            <input
              type="text"
              className="modal-input"
              value={form.secondary}
              onChange={(e) => setForm({ ...form, secondary: e.target.value })}
            />
            <label className="modal-label">Role</label>
            <input
              type="text"
              className="modal-input"
              value={form.tertiary}
              onChange={(e) => setForm({ ...form, tertiary: e.target.value })}
            />
          </>
        )}

        {modalType === 'kid' && (
          <>
            <label className="modal-label">Child name</label>
            <input
              type="text"
              className="modal-input"
              value={form.primary}
              onChange={(e) => setForm({ ...form, primary: e.target.value })}
              autoFocus
            />
            <label className="modal-label">Team</label>
            <input
              type="text"
              className="modal-input"
              value={form.secondary}
              onChange={(e) => setForm({ ...form, secondary: e.target.value })}
            />
            <label className="modal-label">Age group / league</label>
            <input
              type="text"
              className="modal-input"
              value={form.tertiary}
              onChange={(e) => setForm({ ...form, tertiary: e.target.value })}
            />
          </>
        )}

        {modalType === 'add' && (
          <>
            <label className="modal-label">Type</label>
            <select
              className="modal-select"
              value={form.primary}
              onChange={(e) => setForm({ ...form, primary: e.target.value })}
            >
              <option value="team">Team</option>
              <option value="child">Child</option>
            </select>
            {form.primary === 'team' ? (
              <>
                <label className="modal-label">Team name</label>
                <input
                  type="text"
                  className="modal-input"
                  value={form.secondary}
                  onChange={(e) => setForm({ ...form, secondary: e.target.value })}
                  autoFocus
                />
                <label className="modal-label">Age group / league</label>
                <input
                  type="text"
                  className="modal-input"
                  value={form.tertiary}
                  onChange={(e) => setForm({ ...form, tertiary: e.target.value })}
                />
              </>
            ) : (
              <>
                <label className="modal-label">Child name</label>
                <input
                  type="text"
                  className="modal-input"
                  value={form.secondary}
                  onChange={(e) => setForm({ ...form, secondary: e.target.value })}
                  autoFocus
                />
                <label className="modal-label">Age group / league</label>
                <input
                  type="text"
                  className="modal-input"
                  value={form.tertiary}
                  onChange={(e) => setForm({ ...form, tertiary: e.target.value })}
                />
              </>
            )}
          </>
        )}

        <div className="modal-actions">
          <button className="pill-btn ghost" onClick={closeModal}>Cancel</button>
          <button className="pill-btn" onClick={saveModal}>Save</button>
        </div>
      </Modal>
    );
  };

  const { user } = useAuth();

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      {user ? (
        <div className="profile-details">
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      ) : (
        <p>No user loaded.</p>
      )}

      <section className="profile-section">
        <div className="section-head">
          <h2>Account Basics</h2>
        </div>

        <div className="card">
          <div className="row">
            <div>
              <p className="label">Name</p>
              <p className="value">{name}</p>
            </div>
            <button className="pill-btn" onClick={editName}>Edit</button>
          </div>

          <div className="row">
            <div>
              <p className="label">Profile photo</p>
              <p className="value">{photoStatus}</p>
            </div>
            <button className="pill-btn" onClick={changePhoto}>Change</button>
          </div>

          <div className="row">
            <div>
              <p className="label">Email</p>
              <p className="value">{email}</p>
            </div>
            <button className="pill-btn" onClick={updateEmail}>Update</button>
          </div>

          <div className="row">
            <div>
              <p className="label">Password reset</p>
              <p className="value">{passwordStatus}</p>
            </div>
            <button className="pill-btn" onClick={sendReset}>Send</button>
          </div>
        </div>
      </section>

      <section className="profile-section">
        <div className="section-head">
          <h2>Teams & Kids</h2>
        </div>

        <div className="card">
          <p className="subheading">Teams</p>
          {teams.map((team, index) => (
            <div className="row" key={team.name + index}>
              <div>
                <p className="label">{team.name}</p>
                <p className="value">{team.group} · {team.role}</p>
              </div>
              <button className="pill-btn" onClick={() => editTeam(index)}>Edit</button>
            </div>
          ))}

          <p className="subheading">Kids</p>
          {kids.map((kid, index) => (
            <div className="row" key={kid.name + index}>
              <div>
                <p className="label">{kid.name}</p>
                <p className="value">{kid.team} · {kid.group}</p>
              </div>
              <button className="pill-btn" onClick={() => editKid(index)}>Edit</button>
            </div>
          ))}

          <button className="full-btn" onClick={addChildOrTeam}>Add child / team</button>
        </div>
      </section>

      <button className="signout-btn" onClick={handleSignOut}>Sign out</button>

      {renderModal()}
    </div>
  );
};

export default Profile;
