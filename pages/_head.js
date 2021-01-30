import React from 'react';
import Head from 'next/head';
import db from '../db.json';

const { bg, title, description } = db;

export default function HeadConfig() {
  return (
  <Head>
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    <meta name="description" content={db.description} />
        <title>{db.title}</title>

        <meta property="og:type" content="website" />
        <meta property="og:url" content="quiz-imersao-react.savio-2-lopes.vercel.app" key="ogurl" />
        <meta property="og:title" content={db.title} key="title" />
        <meta property="og:description" content={db.description} key="ogdesc" />
        <meta property="og:image" content={db.bg} key="ogimage" />
        
        <link rel="shortcut icon" href="https://assets.materialup.com/uploads/3ac67aad-cf6d-4356-b954-c217bb8aa2de/teaser.png" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
  </Head>
  );
}
