import Link from "next/link";
import Router, { useRouter } from "next/router"
import dynamic from "next/dynamic";
import Head from "next/dist/shared/lib/head";
import dayjs from "dayjs";

import { blueBg} from  '../styles/test.module.css'
import Heng from "../components/heng"

const Test = () => {
  const router = useRouter();
  // console.log(router.query);

  function toIndex() {
    Router.push({
      pathname: "/",
      query: {
        reference: "testPage"
      }
    });
  }

  Router.events.on("routerChangeStart", (url, option) => {
    console.log(url, option);
  })

  Router.events.on("routerChangeComplete", (url, option) => {
    console.log(url, option);
  })

  Router.events.on("beforeHistoryChange", (url, option) => {
    console.log(url, option);
  })

  Router.events.on("hashChangeStart", (url, option) => {
    console.log(url, option);
  })
  Router.events.on("hashChangeComplete", (url, option) => {
    console.log(url, option);
  })
  Router.events.on("routerChangeError", (url, option) => {
    console.log(url, option);
  })


  return (<>
    <Head>
      <title>hello test</title>
    </Head>
    <h1>test page</h1>
    <h3>name: {router.query.pagename}</h3>

    <Link href="/"><a><Heng>to index</Heng></a></Link>
    <br />
    {/* <Link href="/"><button>to index2</button></Link> */}
    <button onClick={toIndex}>TO INDEX</button>
    <br />
    <Link href="#hash1"><button>to hash1</button></Link>
    <br />
    <Link href="#hash2"><button>to hash2</button></Link>
    <br />
    <div className={blueBg} ></div>
    <div className="blueBg" ></div>
  </>)
}

export default Test;

