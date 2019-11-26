import React from "react";

const asteroidesList = ({ astroidesArray }) => {
  const astroidesArray2 = [];
  for (let [key, value] of Object.entries(astroidesArray)) {
    value.forEach(astroid => {
      astroidesArray2.push(astroid);
    });
  }

  return (
    <>
      <ul>
        {astroidesArray2.map(astroid => (
          <li key={astroid.id}>{astroid.name}</li>
        ))}
      </ul>
    </>
  );
};

export default asteroidesList;
