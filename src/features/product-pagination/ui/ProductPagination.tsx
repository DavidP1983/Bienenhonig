import { Pagination } from 'antd';

type Props = {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number, pageSize: number) => void;
  shouldShowProductResults: boolean;
};

export const ProductPagination = ({
  page,
  pageSize,
  total,
  onPageChange,
  shouldShowProductResults,
}: Props) => {
  if (total === 0) return null;

  return (
    <>
      {shouldShowProductResults && (
        <Pagination
          current={page}
          pageSize={pageSize}
          total={total}
          showSizeChanger
          pageSizeOptions={[4, 6, Number(total)]}
          onChange={onPageChange}
          align="center"
        />
      )}
    </>
  );
};
