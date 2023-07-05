import serverAuth from "@/libs/server-actions/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(405).end();
  }

  try {
    const { currentUser } = await serverAuth(req, res);

    res.status(200).json(currentUser);
  } catch (error) {
    if (error instanceof Error) {
      console.log("🚀 ~ file: current.ts:17 ~ error:", error.message);
    }
    res.status(400).end();
  }
}
