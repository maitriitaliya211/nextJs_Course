import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../../styles/BlogPost.module.css";
import * as fs from "fs";

// step 1 : find the file corresponding to  the slug
// step 2: Populate them inside the page

const Slug = (props) => {
  const [blog, setBlog] = useState(props.myBlog);
  // const slug = router.query;
  // useEffect(() => {

  // }, [router.isReady]);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>{blog && blog.title}</h1>
        <div>{blog && blog.content}</div>
      </main>
    </div>
  );
};

export async function getStaticPaths() {
  return {
    paths: [
      { params: { slug: "how-to-learn-flask" } },
      { params: { slug: "how-to-learn-javascript" } },
      { params: { slug: "how-to-learn-nextjs" } },
    ],
    fallback: true, // See the "fallback" section below
  };
}

export async function getStaticProps(context) {
  const slug = context.params.slug;
  // let data = await fetch(`http://localhost:3000/api/getblog?slug=${slug}`);
  // let myBlogs = await data.json();

  let myBlog = await fs.promises.readFile(`blogdata/${slug}.json`, "utf-8");

  return {
    props: { myBlog: JSON.parse(myBlog) },
  };
}

export default Slug;
