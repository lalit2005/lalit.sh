import satori from "satori";
import fs from "fs";
import * as matter from "gray-matter";

const inter400 = await fetch(
  new URL("../../assets/Inter-Regular.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

const inter500 = await fetch(
  new URL("../../assets/Inter-Medium.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

fs.readdirSync("src/content/posts").forEach(async (file) => {
  // const content = fs.readFileSync(``, 'utf-8')
  const { data } = matter.read(`src/content/posts/${file}`);

  const svg = await satori(<div style={{ color: "black" }}>hello, world</div>, {
    width: 600,
    height: 400,
    fonts: [
      {
        name: "Inter",
        data: inter400,
        weight: 400,
        style: "normal",
      },
      {
        name: "Inter",
        data: inter500,
        weight: 500,
        style: "normal",
      },
    ],
  });

  console.log(data);
});
