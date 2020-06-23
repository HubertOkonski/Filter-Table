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
    branchArray.map((branch) => {
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
  }, [props.defaultWorkers]);

  return (
    <>
      <h4>Podsumowanie</h4>
      {summaryEarnings.map((branch) => {
        return (
          <p>
            {branch.name} : {branch.value} PLN
          </p>
        );
      })}
    </>
  );
}

export default Summary;
