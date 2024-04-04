import { OpenAI } from "@langchain/openai";
import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { OpenAIEmbeddings } from "@langchain/openai";
import { loadQAStuffChain, loadQAMapReduceChain } from "langchain/chains";

import express from "express";
import http from "http";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import dotenv from "dotenv";
dotenv.config({
  path: "./config/config.env",
});

import { asyncErrorHandler } from "../utils/asyncErrorHandler.js";
import CustomError from "../utils/CustomeError.js";

export const chatWithBot = asyncErrorHandler(async (req, res, next) => {
  const llmA = new OpenAI({ modelName: "gpt-3.5-turbo" });
  const chainA = loadQAStuffChain(llmA);
  const directory = process.env.DIR;

  const loadedVectorStore = await FaissStore.load(
    directory,
    new OpenAIEmbeddings()
  );

  const question = "what is this article about?"; //question goes here.
  const result = await loadedVectorStore.similaritySearch(question, 1);
  const resA = await chainA.call({
    input_documents: result,
    question,
  });

  res.status(200).json({ status: "success", result: resA });
});

export const chatWithBot2 = asyncErrorHandler(async (req, res, next) => {
  const { question } = req.body;

  const options = {
    method: "POST",
    url: "https://simple-chatgpt-api.p.rapidapi.com/ask",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "b31fd4ef7fmshee8d59d225c8142p123b64jsn07f8b380c8ff",
      "X-RapidAPI-Host": "simple-chatgpt-api.p.rapidapi.com",
    },
    data: question,
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
});
