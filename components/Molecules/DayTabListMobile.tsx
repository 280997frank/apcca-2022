import ArrowLeftCircle from "@/assets/icons/ArrowLeftCircle";
import ArrowRightCircle from "@/assets/icons/ArrowRightCircle";
import { Box, chakra, TabList, VStack } from "@chakra-ui/react";
import dayjs, { Dayjs } from "dayjs";
import {
  ButtonBack,
  ButtonNext,
  CarouselContext,
  CarouselProvider,
  Slide,
  Slider,
} from "pure-react-carousel";
import {
  FC,
  Fragment,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import CustomTab from "../Atoms/CustomTab";

interface Props {
  onChangeTab: (e: SetStateAction<Dayjs>) => void;
}

const EVENT_DATES = [
  { date: dayjs("2022-09-19"), isFocus: false },
  { date: dayjs("2022-09-20"), isFocus: false },
  { date: dayjs("2022-09-21"), isFocus: false },
  { date: dayjs("2022-09-22"), isFocus: false },
  { date: dayjs("2022-09-23"), isFocus: false },
];
const FIRST_DAY_OF_EVENT = dayjs(EVENT_DATES[0].date);
const END_DAY_OF_EVENT = dayjs(EVENT_DATES[4].date);
const ChakrafiedSlider = chakra(Slider);
const ChakrafiedCarouselProvider = chakra(CarouselProvider);

const CustomSlideTab: React.FC<Props> = ({ onChangeTab }) => {
  const carouselContext = useContext(CarouselContext);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isShowBackBtn, setIsShowBackBtn] = useState(true);
  const [isShowNextBtn, setIsShowNextBtn] = useState(true);
  const [eventDates, setEventDates] = useState(EVENT_DATES);

  const handleYMDFormat = (date: Dayjs) => {
    return date.format("YYYY-MM-DD");
  };

  const handleHideShowBtn = useCallback(() => {
    setIsShowBackBtn(
      handleYMDFormat(EVENT_DATES[currentSlide].date) ===
        handleYMDFormat(FIRST_DAY_OF_EVENT)
        ? false
        : true
    );
    setIsShowNextBtn(
      handleYMDFormat(EVENT_DATES[currentSlide].date) ===
        handleYMDFormat(END_DAY_OF_EVENT)
        ? false
        : true
    );
  }, [currentSlide]);

  const handleDateAnimation = useCallback(() => {
    setEventDates((prevState) => {
      const newObj = [...prevState];
      newObj.forEach((item, index) => {
        if (index === currentSlide) {
          item.isFocus = true;
        } else {
          item.isFocus = false;
        }
      });
      return newObj;
    });
  }, [currentSlide]);

  useEffect(() => {
    function onChange() {
      setCurrentSlide(carouselContext.state.currentSlide);
    }
    carouselContext.subscribe(onChange);
    return () => carouselContext.unsubscribe(onChange);
  }, [carouselContext]);

  useEffect(() => {
    handleHideShowBtn();
    handleDateAnimation();
    onChangeTab(EVENT_DATES[currentSlide].date);
  }, [currentSlide, onChangeTab, handleHideShowBtn, handleDateAnimation]);

  return (
    <Fragment>
      <VStack
        justifyContent="center"
        position="absolute"
        left="12px"
        top="30%"
        transform="translateY(-50%)"
        zIndex={2}
        visibility={isShowBackBtn ? "visible" : "hidden"}
      >
        <ButtonBack>
          <ArrowLeftCircle h="2rem" w="2rem" />
        </ButtonBack>
      </VStack>
      <ChakrafiedSlider width="100%">
        <Box>
          {eventDates.map((item, i) => (
            <Slide index={i} key={i}>
              <Box>
                <CustomTab
                  key={i}
                  date={FIRST_DAY_OF_EVENT.clone().add(i, "day")}
                  onClick={() => {}}
                  isFocus={item.isFocus}
                >
                  DAY {i + 1}
                </CustomTab>
              </Box>
            </Slide>
          ))}
        </Box>
      </ChakrafiedSlider>
      <VStack
        justifyContent="center"
        position="absolute"
        right="12px"
        top="30%"
        transform="translateY(-50%)"
        visibility={isShowNextBtn ? "visible" : "hidden"}
      >
        <ButtonNext>
          <ArrowRightCircle h="2rem" w="2rem" />
        </ButtonNext>
      </VStack>
    </Fragment>
  );
};

const DayTabListMobile: FC<Props> = ({ onChangeTab }) => {
  return (
    <TabList
      alignItems="center"
      borderColor="#222222"
      borderBottomWidth="2px"
      height="80px"
      width="100%"
      my="60px"
      position="relative"
    >
      <ChakrafiedCarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={30}
        totalSlides={5}
        visibleSlides={1}
        height="100px"
        width="100%"
        sx={{
          ".carousel__slider ": {
            height: "100%",
            width: "100%",
          },
          "& .carousel__slide-focus-ring": {
            outline: "none",
          },
        }}
      >
        <CustomSlideTab onChangeTab={onChangeTab} />
      </ChakrafiedCarouselProvider>
    </TabList>
  );
};

export default DayTabListMobile;
