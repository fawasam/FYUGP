// components/PdfViewer.jsx
"use client";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { pdfjs } from "react-pdf";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
const PdfViewer = ({ url }: any) => {
  const workerSrc = `https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.min.js`;
  pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  return <Viewer fileUrl={url} plugins={[defaultLayoutPluginInstance]} />;
};
export default PdfViewer;
