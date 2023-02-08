import desktopLandingPng from "@/assets/images/landing-desktop-bg.png";
import mobileLandingPng from "@/assets/images/landing-mobile-bg.png";
import { INITIAL_PAGINATION } from "@/constants/pagination";
import {
  useGetListNoticeboard,
  useNoticeboardReaction,
  useRemoveNoticeboardReaction,
} from "@/hooks/noticeboard";
import { useNoticeboardDispatch } from "@/states/noticeboard/dispatch";
import { INoticeboard } from "@/types/noticeboard";
import { IReqPagination } from "@/types/pagination";
import { Box, Collapse, Text, useDisclosure } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import PageTitle from "../Atoms/PageTitle";
import NoticeboardItem from "../Molecules/NoticeboardItem";
import NoticeboardDetail from "./NoticeboardDetail";

const Noticeboard: React.FC = () => {
  const { isOpen, onToggle } = useDisclosure();
  const { handleBadge } = useNoticeboardDispatch();
  const [totalData, setTotalData] = useState<number>(0);
  const [noticeboardData, setNoticeboardData] = useState<
    INoticeboard[] | undefined
  >();
  const [selectedData, setSelectedData] = useState<INoticeboard | undefined>();
  const [pagination, setPagination] =
    useState<IReqPagination>(INITIAL_PAGINATION);

  const { fetchListNoticeboard, data } = useGetListNoticeboard(pagination);
  const { featchNoticeboardReaction } = useNoticeboardReaction(pagination);
  const { featchRemoveNoticeboardReaction } =
    useRemoveNoticeboardReaction(pagination);

  useEffect(() => {
    fetchListNoticeboard();
  }, [fetchListNoticeboard]);

  useEffect(() => {
    if (data) {
      const {
        listNoticeboard: { data: res, total },
      } = data;
      setTotalData(total);
      if (pagination.page === 1) {
        setNoticeboardData(res);
      } else {
        setNoticeboardData((prevState) => {
          if (prevState) {
            return [...prevState, ...res];
          } else {
            return res;
          }
        });
      }
    }
  }, [data, pagination]);

  const handleReaction = async (noticeboardId: string, isLike: boolean) => {
    const variables = {
      noticeboardReactionInput: {
        noticeboardId,
      },
    };
    const temp = noticeboardData?.map((item) => {
      const newObj = { ...item };
      if (newObj.id === noticeboardId) {
        newObj.totalLike = isLike ? newObj.totalLike + 1 : newObj.totalLike - 1;
        newObj.isLike = isLike;
      }
      return newObj;
    });
    setNoticeboardData(temp);
    if (isLike) {
      await featchNoticeboardReaction({ variables });
    } else {
      await featchRemoveNoticeboardReaction({ variables });
    }
  };

  const handleResetAfterDetailClosed = useCallback(() => {
    if (!isOpen && selectedData) {
      setPagination(INITIAL_PAGINATION);
      fetchListNoticeboard({
        variables: INITIAL_PAGINATION,
      });
    }
  }, [isOpen, selectedData, fetchListNoticeboard]);

  useEffect(() => {
    handleResetAfterDetailClosed();
  }, [handleResetAfterDetailClosed]);

  return (
    <Box
      bgPosition="bottom"
      bgRepeat="no-repeat"
      bgSize="100% 100%"
      bgImage={{ base: mobileLandingPng.src, lg: desktopLandingPng.src }}
      height={{ base: "88vh", lg: "100%" }}
      overflowY="scroll"
      px={{ base: 6, lg: "unset" }}
      p={{ base: "20px", xl: "20px 0px" }}
      id={isOpen ? "bg" : "scrollableDiv"}
    >
      <Collapse in={!isOpen}>
        <PageTitle title="Noticeboard" />
        <Box px={{ base: 0, lg: 8 }} flexDir="column" gridGap={3}>
          {!noticeboardData ? (
            <Text>Loading...</Text>
          ) : (
            <InfiniteScroll
              dataLength={noticeboardData.length}
              next={() => {
                setPagination({
                  page: pagination.page + 1,
                  limit: pagination.limit,
                });
                handleBadge("0");
              }}
              hasMore={noticeboardData.length < totalData}
              loader={<Text color="white">Loading...</Text>}
              scrollableTarget="scrollableDiv"
            >
              {noticeboardData.map((item) => (
                <Box key={item.id} mb={4}>
                  <NoticeboardItem
                    data={item}
                    onClickDetail={(e) => {
                      onToggle();
                      setSelectedData(e);
                    }}
                    onClickLike={handleReaction}
                  />
                </Box>
              ))}
            </InfiniteScroll>
          )}
        </Box>
      </Collapse>
      {selectedData && (
        <Collapse in={isOpen} animateOpacity>
          <NoticeboardDetail
            data={selectedData}
            onToggle={onToggle}
            onClickLike={handleReaction}
          />
        </Collapse>
      )}
    </Box>
  );
};

export default Noticeboard;
