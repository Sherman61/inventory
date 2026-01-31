import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export function Scan() {
  const [value, setValue] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!value.trim()) return;
    const trimmed = value.trim();
    if (/^\d+$/.test(trimmed)) {
      navigate(`/boxes/${trimmed}`);
      return;
    }
    navigate(`/boxes?search=${encodeURIComponent(trimmed)}`);
  };

  return (
    <section className="page">
      <header>
        <h1>Scan</h1>
        <p>Scan a barcode or enter a box ID.</p>
      </header>
      <form className="scan-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Scan or type barcode"
          autoFocus
        />
        <button type="submit">Open Box</button>
      </form>
      <p className="muted">Numeric inputs open the box ID. Barcodes perform a search.</p>
    </section>
  );
}
