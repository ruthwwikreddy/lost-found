import React, { useState, useEffect } from 'react';
    import ReactDOM from 'react-dom';
    import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

    const Home = () => {
      return (
        <div>
          <h1>Lost & Found</h1>
          <nav>
            <Link to="/report">Report Lost Item</Link>
            <Link to="/search">Search Lost Items</Link>
          </nav>
          <div className="section">
            <h2>Welcome!</h2>
            <p>Use the navigation to report lost items or search for them.</p>
          </div>
        </div>
      );
    };

    const ReportLostItem = () => {
      const [item, setItem] = useState({ description: '', contact: '', image: '' });
      const [successMessage, setSuccessMessage] = useState('');
      const [loading, setLoading] = useState(false);

      const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const items = JSON.parse(localStorage.getItem('lostItems')) || [];
        items.push({ ...item, found: false });
        localStorage.setItem('lostItems', JSON.stringify(items));
        setItem({ description: '', contact: '', image: '' });
        setSuccessMessage('Item reported successfully!');
        setLoading(false);
        setTimeout(() => setSuccessMessage(''), 3000);
      };

      const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setItem({ ...item, image: reader.result });
          };
          reader.readAsDataURL(file);
        }
      };

      return (
        <div className="section">
          <h2>Report a Lost Item</h2>
          {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
          {loading && <p className="loading">Submitting...</p>}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Item Description"
              value={item.description}
              onChange={(e) => setItem({ ...item, description: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Your Contact Info"
              value={item.contact}
              onChange={(e) => setItem({ ...item, contact: e.target.value })}
              required
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
            {item.image && <img src={item.image} alt="Uploaded Item" />}
            <button type="submit" className="button">Submit</button>
          </form>
        </div>
      );
    };

    const SearchLostItems = () => {
      const [items, setItems] = useState([]);
      const [loading, setLoading] = useState(true);

      useEffect(() => {
        const storedItems = JSON.parse(localStorage.getItem('lostItems')) || [];
        setItems(storedItems);
        setLoading(false);
      }, []);

      const markAsFound = (index) => {
        const updatedItems = [...items];
        updatedItems[index].found = true;
        localStorage.setItem('lostItems', JSON.stringify(updatedItems));
        setItems(updatedItems);
      };

      return (
        <div className="section">
          <h2>Search for Lost Items</h2>
          {loading ? (
            <p className="loading">Loading items...</p>
          ) : items.length === 0 ? (
            <p>No items reported lost.</p>
          ) : (
            <div>
              {items.map((item, index) => (
                !item.found && (
                  <div className="item-card" key={index}>
                    <p>{item.description} - Contact: {item.contact}</p>
                    {item.image && <img src={item.image} alt="Lost Item" />}
                    <button onClick={() => markAsFound(index)} className="button">Mark as Found</button>
                  </div>
                )
              ))}
            </div>
          )}
        </div>
      );
    };

    const App = () => {
      return (
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/report" element={<ReportLostItem />} />
            <Route path="/search" element={<SearchLostItems />} />
          </Routes>
        </Router>
      );
    };

    ReactDOM.render(<App />, document.getElementById('app'));
