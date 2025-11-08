import { useState } from 'react';
import { Pagination } from '../Pagination';

export default function PaginationExample() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={10}
      pageSize={pageSize}
      onPageChange={setCurrentPage}
      onPageSizeChange={setPageSize}
    />
  );
}
