// import React from 'react';
//
// function Test() {
//   return <h1>Learn React and Next.js</h1>
// }
//
// export default Test;

import Image from "next/image";

const YourComponent = () => (
  <Image
    src="/images/profile.jpg" // Route of the image file
    height={144} // Desired size with correct aspect ratio
    width={144} // Desired size with correct aspect ratio
    alt="Your Name"
  />
);
export default YourComponent;
