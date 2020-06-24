import React, { useState, useEffect } from "react";
function Summary(props) {
  const [summaryEarnings, setSummaryEarnings] = useState(["elo"]);
  const createUniqueArrayOfBranches = () => {
    let branchArray = [
      ...new Set(
        props.defaultWorkers.map((person) => {
          return person.dzial;
        })
      ),
    ];
    return branchArray;
  };
  const fillArrayWithEarnings = (branchArray) => {
    let resultArray = [];
    branchArray.forEach((branch) => {
      let branchEarnings = 0;
      props.defaultWorkers.forEach((worker) => {
        if (branch === worker.dzial)
          branchEarnings += parseInt(worker.wynagrodzenieKwota);
      });
      resultArray.push({
        name: branch,
        value: branchEarnings,
      });
    });
    return resultArray;
  };
  const sumEarnings = () => {
    let arrayOfObj = [];
    let branchArray = createUniqueArrayOfBranches();
    arrayOfObj = fillArrayWithEarnings(branchArray);
    setSummaryEarnings(arrayOfObj);
  };
  useEffect(() => {
    sumEarnings();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.defaultWorkers]);

  return (
    <>
      <h4>Podsumowanie</h4>
      {summaryEarnings.map((branch,index) => {
        return (
          <p key={index}>
            {branch.name} : {branch.value} PLN
          </p>
        );
      })}
    </>
  );
}

export default Summary;
