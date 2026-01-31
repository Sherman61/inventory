import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBox } from '../api';
import { Skeleton } from '../components/Skeleton';
import { Toast, ToastMessage } from '../components/Toast';

export function BoxDetail() {
  const { id } = useParams();
  const [box, setBox] = useState<Awaited<ReturnType<typeof fetchBox>> | null>(null);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  useEffect(() => {
    if (!id) return;
    fetchBox(id)
      .then((data) => setBox(data))
      .catch(() => setBox(null));
  }, [id]);

  const notify = (message: string) => {
    setToast({ id: Date.now(), message });
  };

  return (
    <section className="page">
      <header>
        <h1>Box Details</h1>
        <p>Review contents and manage items.</p>
      </header>
      {!box && <Skeleton lines={6} />}
      {box && (
        <div className="card">
          <div className="box-header">
            <div>
              <h2>{box.label ?? `Box #${box.id}`}</h2>
              <p className="muted">Barcode: {box.barcode}</p>
            </div>
            <div className="chip">{box.location}</div>
          </div>
          <p className="muted">Imported: {new Date(box.importDate).toLocaleDateString()}</p>
          <h3>Items</h3>
          {box.items.length === 0 && <p>No items in this box.</p>}
          {box.items.length > 0 && (
            <ul className="item-list">
              {box.items.map((item) => (
                <li key={item.id}>
                  <div>
                    <strong>{item.name}</strong>
                    <span className="muted">{item.sku ?? 'No SKU'}</span>
                  </div>
                  <div>
                    {item.quantity} {item.unit ?? 'units'}
                  </div>
                </li>
              ))}
            </ul>
          )}
          <div className="actions">
            <button type="button" onClick={() => notify('Item added (demo)')}>
              Add Item
            </button>
            <button type="button" className="danger" onClick={() => notify('Item removed (demo)')}>
              Remove Item
            </button>
          </div>
        </div>
      )}
      <Toast message={toast} onClose={() => setToast(null)} />
    </section>
  );
}
