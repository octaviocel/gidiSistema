import { ReactMarkdown } from "react-markdown/lib/react-markdown";


export default function Viewer({value}) {
  return <ReactMarkdown>{value}</ReactMarkdown>;
}