import { SupportPage } from "@/pages_fsd/support/ui/SupportPage";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("SupportMate");

  return {
    title: t("supportTitle"),
  };
}
const Support = () => {
  return (
    <>
      <SupportPage />
    </>
  );
};

export default Support;
