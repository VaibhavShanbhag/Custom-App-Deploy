import { Card, Page, Layout, TextContainer, Text } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation } from "react-i18next";
import { TypographyCard } from "../components";

export default function PageName() {
  const { t } = useTranslation();
  return (
    <Page>
      <TitleBar title={t("Schemes Background Change")} primaryAction={null} />
      <Layout>
        <Layout.Section>
          <TypographyCard />
        </Layout.Section>
      </Layout>
    </Page>
  );
}
