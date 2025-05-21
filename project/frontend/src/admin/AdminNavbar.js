import { Link } from 'react-router-dom';

export default function AdminNavbar() {
  return (
    <nav>
      <Link to="/admin">Dashboard</Link> | 
      <Link to="/admin/users">Users</Link> | 
      <Link to="/admin/products">Products</Link> | 
      <Link to="/admin/orders">Orders</Link>
    </nav>
  );
}
