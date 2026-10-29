import type { LocationType } from "@/entities/location/model/type";
import { ScrollToTop } from "@/shared/ui/ScrollToTop";
import { Location } from "@/widgets/Location/ui";

export const LocationPage = (props: LocationType) => {
  return (
    <>
      <Location {...props} />
      <ScrollToTop />
    </>
  );
};
