import React from 'react';
import Techers from './techers';
import Students from './students';
import Courses from './courses';

export default function PendingIndex() {
  return (
    <>
      <Techers />
      <Students />
      <Courses />
    </>
  );
}
