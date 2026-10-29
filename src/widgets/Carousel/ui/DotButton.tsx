import { PropType } from "../model/types";

export const DotButton = (props: PropType) => {
  const { children, ...restProps } = props;

  return (
    <button
      type="button"
      title="dot buttons"
      aria-label="dot buttons navigation"
      {...restProps}
    >
      {children}
    </button>
  );
};
