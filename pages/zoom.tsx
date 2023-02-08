import dynamic from "next/dynamic";
import Head from "next/head";

const ZoomMeeting = dynamic(
  () => import("@/components/Organisms/ZoomMeeting"),
  {
    ssr: false,
  }
);

const ZoomPage = () => {
  return (
    <>
      <Head>
        <title>Breakout Room | APCCA 2022</title>
        <meta name="description" content="Breakout Room" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ZoomMeeting />
    </>
  );
};

export default ZoomPage;
