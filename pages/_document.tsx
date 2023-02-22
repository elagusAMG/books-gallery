import {Html, Head, Main, NextScript} from 'next/document'

export default function Document() {
  return (
    <Html
      lang="en"
      className="bg-white text-black dark:bg-[#111010] dark:text-white"
    >
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
