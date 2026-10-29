import { Pagination } from "antd";

type Props = {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number, pageSize: number) => void;
};

export const ProductPagination = ({
  page,
  pageSize,
  total,
  onPageChange,
}: Props) => {
  if (total === 0) return null;

  return (
    <Pagination
      current={page}
      pageSize={pageSize}
      total={total}
      showSizeChanger
      pageSizeOptions={[4, 6, Number(total)]}
      onChange={onPageChange}
      align="center"
    />
  );
};
