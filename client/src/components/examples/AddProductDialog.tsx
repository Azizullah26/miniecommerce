import { AddProductDialog } from '../AddProductDialog';

export default function AddProductDialogExample() {
  return <AddProductDialog onAddProduct={(product) => console.log('Product added:', product)} />;
}
