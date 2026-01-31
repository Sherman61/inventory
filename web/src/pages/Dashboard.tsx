import { useEffect, useState } from 'react';
import { API_BASE, Box } from '../api';
import { Skeleton } from '../components/Skeleton';

export function Dashboard() {
  const [boxes, setBoxes] = useState<Box[] | null>(null);
  const [activity, setActivity] = useState<unknown[]>([]);

  useEffect(() => {
    fetch(`${API_BASE}/boxes`)
      .then((res) => res.json())
      .then((data) => setBoxes(data))
      .catch(() => setBoxes([]));
  }, []);

  useEffect(() => {
    setActivity([
      { type: 'BOX_CREATED', detail: 'New box added' },
      { type: 'ITEM_ADDED', detail: 'Item added to Box 12' },
    ]);
  }, []);

  const totalBoxes = boxes?.length ?? 0;

  return (
    <section className="page">
      <header>
        <h1>Dashboard</h1>
        <p>Quick KPIs and recent activity.</p>
      </header>
      <div className="kpi-grid">
        <div className="kpi-card">
          <h3>Total Boxes</h3>
          <div className="kpi-value">{totalBoxes}</div>
        </div>
        <div className="kpi-card">
          <h3>Locations</h3>
          <div className="kpi-value">{boxes ? new Set(boxes.map((b) => b.location)).size : '—'}</div>
        </div>
        <div className="kpi-card">
          <h3>Latest Import</h3>
          <div className="kpi-value">
            {boxes && boxes[0] ? new Date(boxes[0].importDate).toLocaleDateString() : '—'}
          </div>
        </div>
      </div>
      <div className="card">
        <h2>Recent Activity</h2>
        {!boxes && <Skeleton lines={4} />}
        <ul className="activity-list">
          {activity.map((entry, index) => (
            <li key={index}>
              <strong>{entry.type}</strong> — {entry.detail}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
