import React from 'react';

import ImageManipulation from '..';

export default {
  title: 'Playground',
  component: ImageManipulation,
};

export const Default = () => (
  <ImageManipulation
    imgSrc='https://images.unsplash.com/photo-1617195920950-1145bf9a9c72?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    width='90vw'
    height='80vh'
  />
);
