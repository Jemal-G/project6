import './App.css';
import { withAuthenticator } from '@aws-amplify/ui-react';

function Profile({ signOut, user }) {
  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
      alert('Failed to sign out. Please try again.');
    }
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    margin: '0 auto',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center',
    position: 'relative',
    backgroundColor: '#add8e6',
    boxShadow: '0 4px 8px rgba(206, 9, 9, 0.2)',
  };

  const headerStyle = {
    marginBottom: '20px',
    fontSize: '24px',
    fontWeight: 'bold',
  };

  const buttonStyle = {
    padding: '10px 20px',
    margin: '20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: '1em solid #007bff',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
  };

  const buttonHoverStyle = {
    backgroundColor: '#0056b3',
  };

  if (!user) {
    return <div style={{ textAlign: 'center', marginTop: '20%' }}>
      Loading user data...</div>;
  }


  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Welcome, {user.username || 'User'}!</h1>
      <p style={{ marginBottom: '20px' }}>
        <strong>User ID:</strong> {user.userId || 'N/A'}
      </p>
      <button
        onClick={handleSignOut}
        style={buttonStyle}
        onMouseOver={(e) =>
          (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
        onMouseOut={(e) =>
          (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
        aria-label="Sign out of your account"
      >
        Sign Out
      </button>
    </div>
  );
}

export default withAuthenticator(Profile);
