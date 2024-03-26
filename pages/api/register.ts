import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    // 405 Method Not Allowed: The request method is not supported for the requested resource.
    return res.status(405).end();
  }
  try {
    const { email, username, password } = req.body;

    const existingUser = await prismadb.user.findUnique({
      where: {
        email: email,
      },
    });
    if (existingUser) {
      return res.status(422).json({ error: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prismadb.user.create({
      data: {
        email: email,
        hashedPassword: hashedPassword,
        name: username,
        image: "",
        emailVerified: new Date(),
      },
    });
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(400).end(); // 400 Bad Request. The server cannot process the request.
  }
}
