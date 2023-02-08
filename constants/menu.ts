import home from "@/assets/images/Home.png";
import auditorium from "@/assets/images/Auditorium.png";
import breakout from "@/assets/images/Breakout.png";
import discussion from "@/assets/images/DiscussionForum.png";
import feedback from "@/assets/images/Feedback.png";
import networking from "@/assets/images/Networking.png";
import noticeboard from "@/assets/images/NoticeBoard.png";
import overview from "@/assets/images/Overview.png";
import programme from "@/assets/images/Programme.png";
import resources from "@/assets/images/Resources.png";

export const menuScroll = [
  {
    label: "Home",
    id: "home",
    url: "/lobby",
    img: home.src,
    isBatch1: true,
  },
  {
    label: "Auditorium",
    id: "auditorium",
    url: "/auditorium",
    img: auditorium.src,
    isBatch1: false,
  },
  {
    label: "APCCA Overview",
    id: "apcca-overview",
    url: "/overview",
    img: overview.src,
    isBatch1: true,
  },
  {
    label: "Conference Programme",
    id: "conference-programme",
    url: "/conference-programme",
    img: programme.src,
    isBatch1: false,
  },
  {
    label: "Networking",
    id: "networking",
    url: "/networking",
    img: networking.src,
    isBatch1: false,
  },
  {
    label: "Discussion Forum",
    id: "discussion-forum",
    url: "/discussion-forum",
    img: discussion.src,
    isBatch1: false,
  },
  {
    label: "Breakout Rooms",
    id: "breakout-rooms",
    url: "/breakout-rooms",
    img: breakout.src,
    isBatch1: false,
  },
  {
    label: "Noticeboard",
    id: "noticeboard",
    url: "/noticeboard",
    img: noticeboard.src,
    badge: "0",
    isBatch1: false,
  },
  {
    label: "Conference Resources",
    id: "conference-resources",
    url: "/conference-resources",
    img: resources.src,
    isBatch1: true,
  },
  {
    label: "Feedback",
    id: "feedback",
    url: "/feedback",
    img: feedback.src,
    isBatch1: false,
  },
];
