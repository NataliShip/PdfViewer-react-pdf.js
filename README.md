# PdfViewer-react-pdf.js📄
[![Build Status](https://travis-ci.com/NataliShip/PdfViewer-react-pdf.js.svg?branch=master)](https://travis-ci.com/NataliShip/PdfViewer-react-pdf.js)   ![Latest Stable Version](https://img.shields.io/github/release/NataliShip/PdfViewer-react-pdf.js.svg) [![GitHub stars](https://img.shields.io/github/stars/NataliShip/PdfViewer-react-pdf.js.svg)](https://github.com/NataliShip/PdfViewer-react-pdf.js/stargazers) ![GitHub All Releases](https://img.shields.io/github/downloads/NataliShip/PdfViewer-react-pdf.js/total.svg)  ![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/NataliShip/PdfViewer-react-pdf.js.svg)  ![GitHub last commit](https://img.shields.io/github/last-commit/NataliShip/PdfViewer-react-pdf.js.svg)

A React component to wrap Mozilla's [PDF.js](http://mozilla.github.io/pdf.js/) with Text layer and Annotation layer, with pagination and fullcsreen mode, link opens in new tab.

You can see working **DEMO** on github pages https://nataliship.github.io/PdfViewer-react-pdf.js/

**Usage**

*Props:*

`src` - link to your pdf file (absolute or relative) or prf file in base64 encoding

`sandbox` - boolean flag to enable sandbox mode for development (you can download any pdf)

```js      
import PdfViewer from './PdfViewer/PdfViewer'
...

<PdfViewer sandbox />  
<PdfViewer src={your_src} />
...
```


![Alt text](https://raw.githubusercontent.com/NataliShip/PdfViewer-react-pdf.js/master/public/demo-screenshot.png "pdfViewer")
