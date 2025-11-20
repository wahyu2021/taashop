import type { ComponentProps } from "react";

import ProductMaterialShowcase, { type MaterialItem } from "@/components/ProductMaterialShowcase";
import { COMMON_MATERIALS } from "@/data/materials";

type ProductMaterialShowcaseProps = ComponentProps<typeof ProductMaterialShowcase>;

interface MaterialsSectionProps extends Omit<ProductMaterialShowcaseProps, "items"> {
  items?: MaterialItem[];
}

export function MaterialsSection({
  heading = "Detail Bahan",
  intro = "Sesuaikan nama, deskripsi, dan poin keunggulan sesuai informasi dari owner.",
  items = COMMON_MATERIALS,
  ...rest
}: MaterialsSectionProps) {
  return (
    <ProductMaterialShowcase
      heading={heading}
      intro={intro}
      items={items}
      {...rest}
    />
  );
}

export default MaterialsSection;
