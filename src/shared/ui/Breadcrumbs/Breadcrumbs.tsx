import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import { useTranslations } from "next-intl";
import Link from "next/link";

export const Breadcrumbs = ({ title }: { title: string | undefined }) => {
  const t = useTranslations("ProductsPage");

  return (
    <Breadcrumb
      items={[
        {
          title: (
            <Link href="/" aria-label="Home">
              <HomeOutlined />
            </Link>
          ),
        },
        {
          title: <Link href="/products">{t("title")}</Link>,
        },
        {
          title: <p>{title ?? ""}</p>,
        },
      ]}
    />
  );
};
