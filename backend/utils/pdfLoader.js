import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { OpenAIEmbeddings } from "@langchain/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import path from "path";
import dotenv from "dotenv";
dotenv.config({
  path: "./config/config.env",
});
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("Current directory:", __dirname);
export const injest_docs = async () => {
  const loader = new PDFLoader("curriculum.pdf"); //you can change this to any PDF file of your choice.
  const docs = await loader.load();
  console.log("docs loaded");

  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });

  const docOutput = await textSplitter.splitDocuments(docs);
  let vectorStore = await FaissStore.fromDocuments(
    docOutput,
    new OpenAIEmbeddings()
  );
  console.log("saving...");

  const directory = __dirname;
  await vectorStore.save(directory);
  console.log("saved!");
};

injest_docs();
