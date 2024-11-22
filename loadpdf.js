import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

const nike10kPdfPath = "cv/cv 2.pdf";

const loader = new PDFLoader(nike10kPdfPath);

const docs = await loader.load();
console.log(docs[0]);

console.log(docs[0].metadata);