import type { NextApiRequest, NextApiResponse } from "next";
import { StreamChat } from "stream-chat";

type Data = {
  token: string;
};

const client = StreamChat.getInstance(
  process.env.NEXT_PUBLIC_GETSTREAM_KEY as string,
  process.env.NEXT_PUBLIC_GETSTREAM_SECRET
);

export default function handler(_: NextApiRequest, res: NextApiResponse<Data>) {
  const token = client.createToken("testUser");
  res.status(200).json({ token });
}
