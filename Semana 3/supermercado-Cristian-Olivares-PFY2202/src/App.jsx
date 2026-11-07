import { InventoryProvider } from './context/InventoryProvider';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  return (
    <InventoryProvider>
      <AppRoutes />
    </InventoryProvider>
  );
}
