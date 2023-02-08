import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setNoticeboardBadge } from "./slices";

export const useNoticeboardDispatch = () => {
  const dispatch = useDispatch();

  const noticeboardBadge = useSelector(
    (state: RootState) => state.noticeboard.badge,
    shallowEqual
  );

  const handleBadge = (badge: string) => {
    dispatch(setNoticeboardBadge(badge));
  };

  return {
    noticeboardBadge,
    handleBadge,
  };
};
