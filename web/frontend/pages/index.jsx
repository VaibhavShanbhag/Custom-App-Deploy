import {
  Card,
  Page,
  Layout,
  TextContainer,
  Image,
  Stack,
  Link,
  Text,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation, Trans } from "react-i18next";

import { trophyImage } from "../assets";

import { ProductsCard } from "../components";

export default function HomePage() {
  const { t } = useTranslation();
  return (
    <Page narrowWidth>
      <TitleBar title={t("Typography Change in Checkout")} primaryAction={null} />
      <Layout>
        <Layout.Section>
          {/* <TypographyCard/> */}
          <ProductsCard />
        </Layout.Section>
      </Layout>
    </Page>
  );
}
