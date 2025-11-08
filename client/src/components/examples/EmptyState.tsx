import { EmptyState } from '../EmptyState';

export default function EmptyStateExample() {
  return (
    <EmptyState
      message="Try adjusting your filters or add a new product."
      action={{
        label: "Add Product",
        onClick: () => console.log("Add product clicked")
      }}
    />
  );
}
