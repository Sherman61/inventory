import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchBoxes, Box } from '../api';
import { Skeleton } from '../components/Skeleton';

export function Boxes() {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [boxes, setBoxes] = useState<Box[] | null>(null);

  const queryString = useMemo(() => {
    const params = new URLSearchParams();
    if (query) params.set('search', query);
    if (location) params.set('location', location);
    const value = params.toString();
    return value ? `?${value}` : '';
  }, [query, location]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      fetchBoxes(queryString)
        .then((data) => setBoxes(data))
        .catch(() => setBoxes([]));
    }, 300);
    return () => window.clearTimeout(timer);
  }, [queryString]);

  return (
    <section className="page">
      <header>
        <h1>Boxes</h1>
        <p>Search and filter boxes by barcode, label, or item name.</p>
      </header>
      <div className="filters">
        <input
          type="search"
          placeholder="Search by barcode, label, or item"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by location"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
        />
      </div>
      <div className="card">
        {!boxes && <Skeleton lines={5} />}
        {boxes && boxes.length === 0 && <p>No boxes found.</p>}
        {boxes && boxes.length > 0 && (
          <ul className="box-list">
            {boxes.map((box) => (
              <li key={box.id}>
                <Link to={`/boxes/${box.id}`}>
                  <div>
                    <strong>{box.label ?? `Box #${box.id}`}</strong>
                    <span className="muted">{box.barcode}</span>
                  </div>
                  <div className="chip">{box.location}</div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
