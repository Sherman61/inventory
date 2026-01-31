CREATE DATABASE IF NOT EXISTS inventory;
USE inventory;

CREATE TABLE IF NOT EXISTS boxes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  barcode VARCHAR(255) NOT NULL,
  label VARCHAR(255) NULL,
  location VARCHAR(255) NOT NULL,
  importDate DATETIME NOT NULL,
  notes TEXT NULL,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uk_boxes_barcode (barcode),
  INDEX idx_boxes_location (location),
  INDEX idx_boxes_importDate (importDate)
);

CREATE TABLE IF NOT EXISTS items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  boxId INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  sku VARCHAR(255) NULL,
  quantity INT NOT NULL,
  unit VARCHAR(64) NULL,
  removedAt DATETIME NULL,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_items_boxId (boxId),
  INDEX idx_items_name (name),
  CONSTRAINT fk_items_box
    FOREIGN KEY (boxId)
    REFERENCES boxes (id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS activity_log (
  id INT AUTO_INCREMENT PRIMARY KEY,
  type VARCHAR(64) NOT NULL,
  details JSON NOT NULL,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_activity_type (type)
);

INSERT INTO boxes (barcode, label, location, importDate, notes)
VALUES
  ('BOX-1001', 'Kitchen supplies', 'Storage A', '2024-02-10 09:00:00', 'Glassware and plates'),
  ('BOX-1002', 'Office archive', 'Storage B', '2024-03-05 14:30:00', 'Old documents');

INSERT INTO items (boxId, name, sku, quantity, unit)
VALUES
  (1, 'Dinner Plate', 'PLT-001', 24, 'pcs'),
  (1, 'Wine Glass', 'GLS-002', 12, 'pcs'),
  (2, 'File Folder', 'OFF-100', 40, 'pcs');

INSERT INTO activity_log (type, details)
VALUES
  ('BOX_CREATED', JSON_OBJECT('boxId', 1, 'barcode', 'BOX-1001')),
  ('ITEM_ADDED', JSON_OBJECT('itemId', 1, 'boxId', 1));
