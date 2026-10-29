import { Skeleton } from "antd";

import styles from "./Skeleton.module.scss";

type Props = {
  length: number;
  title: string;
  rows: number;
  width: string[] | string;
};

export const SkeletonJSX = ({ length, title, rows, width }: Props) => {
  return (
    <ul className={styles.skeleton}>
      {Array.from({ length: length }).map((_, index) => (
        <li key={index}>
          <Skeleton
            active
            title={{ width: title }}
            paragraph={{ rows: rows, width: width }}
          />
        </li>
      ))}
    </ul>
  );
};
