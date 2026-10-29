import type { CollapseProps } from "antd";
type Translate = (key: string) => string;

export const getAccordionItems = (t: Translate): CollapseProps["items"] => [
  {
    key: "1",
    label: (
      <span className="ant-collapse-header-text label" role="tab">
        {t("recipes.label")}
      </span>
    ),
    children: (
      <p className="descr" role="tabpanel" aria-labelledby="tab1">
        {t("recipes.description")}
      </p>
    ),
  },
  {
    key: "2",
    label: (
      <span className="ant-collapse-header-text label" role="tab">
        {t("opinions.label")}
      </span>
    ),
    children: (
      <p className="descr" role="tabpanel" aria-labelledby="tab2">
        {t("opinions.description")}
      </p>
    ),
  },
  {
    key: "3",
    label: (
      <span className="ant-collapse-header-text label" role="tab">
        {t("books.label")}
      </span>
    ),
    children: (
      <p className="descr" role="tabpanel" aria-labelledby="tab3">
        {t("books.description")}
      </p>
    ),
  },
];
