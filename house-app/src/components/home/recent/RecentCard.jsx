// RecentCard.jsx

import React from "react";

const RecentCard = ({ data }) => {
  return (
    <>
      <div className='content grid3 mtop'>
        {data.map((val, index) => {
          const { _id, CRIM, ZN, INDUS, CHAS, NOX, RM, AGE, DIS, RAD, TAX, PTRATIO, B, LSTAT, MEDV } = val;
          return (
            <div className='box shadow' key={index}>
              <div className='img'>
                <img src="../images/list/p-1.png" alt='' />
              </div>
              <div className='text'>
                <div className='category flex'>
                  <span style={{ background: "#25b5791a", color: "#25b579" }}>For Sale</span>
                  <i className='fa fa-heart'></i>
                </div>
                <h4>{`AGE: ${AGE}, CRIM: ${CRIM}, LSTAT: ${LSTAT}`}</h4>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default RecentCard;
