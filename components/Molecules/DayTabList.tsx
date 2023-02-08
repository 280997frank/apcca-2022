import CustomTab from "@/components/Atoms/CustomTab";
import { TabList } from "@chakra-ui/react";
import dayjs, { Dayjs } from "dayjs";
import "pure-react-carousel/dist/react-carousel.es.css";
import { FC, SetStateAction } from "react";
import { isMobileOnly } from "react-device-detect";
import DayTabListMobile from "./DayTabListMobile";

interface Props {
  onChangeTab: (e: SetStateAction<Dayjs>) => void;
}

const FIRST_DAY_OF_EVENT = dayjs("2022-09-19");

const DayTabList: FC<Props> = ({ onChangeTab }) => {
  if (isMobileOnly) {
    return <DayTabListMobile onChangeTab={onChangeTab} />;
  }

  return (
    <TabList
      alignItems="center"
      borderColor="#222222"
      borderBottomWidth="2px"
      py="10px"
      justifyContent={{ base: "start", md: "center" }}
      overflowX="auto"
      sx={{
        scrollbarWidth: "none",
        "::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <CustomTab
          key={i}
          date={FIRST_DAY_OF_EVENT.clone().add(i, "day")}
          onClick={(e: SetStateAction<Dayjs>) => onChangeTab(e)}
        >
          DAY {i + 1}
        </CustomTab>
      ))}
    </TabList>
  );
};

export default DayTabList;
