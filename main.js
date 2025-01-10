import React from 'react';
    import ReactDOM from 'react-dom';

    const App = () => {
      return (
        <div>
          <h1>Lost & Found</h1>
          <div className="section">
            <h2>Report a Lost Item</h2>
            <p>Upload a photo and provide a brief description of the lost item.</p>
            <a href="#" className="button">Report Lost Item</a>
          </div>
          <div className="section">
            <h2>Search for Lost Items</h2>
            <p>Use keywords or categories to find lost items quickly.</p>
            <a href="#" className="button">Search Lost Items</a>
          </div>
          <div className="section">
            <h2>User Profiles</h2>
            <p>Manage your profile and view your reported items.</p>
            <a href="#" className="button">View Profile</a>
          </div>
        </div>
      );
    };

    ReactDOM.render(<App />, document.getElementById('app'));
