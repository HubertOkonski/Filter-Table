import React from "react";
import { useState, useEffect } from "react";
import { Slider } from "@material-ui/core";
import { InputGroup, FormControl, Form } from "react-bootstrap";
import CheckboxComponent from "./Checkbox";
function SearchPanel(props) {
  const { defaultWorkers, setWorkersList } = props;
  const branchArrayCreator = (array) => {
    let uniqueArray = array.map((worker) => {
      return worker.dzial;
    });
    uniqueArray = [...new Set(uniqueArray)];
    return uniqueArray;
  };

  const maxEarningFill = () => {
    let maxValue = 0;
    defaultWorkers.forEach((person) => {
      if (parseInt(person.wynagrodzenieKwota) >= maxValue)
        maxValue = person.wynagrodzenieKwota;
    });
    return parseInt(maxValue);
  };
  const [formData, setFormData] = useState({
    name: "",
    branch: branchArrayCreator(props.filtredWorkersArray),
    value: [0, maxEarningFill()],
  });

  const branchArrayUpdate = (defaultWorkers) => {
    let lastItem = defaultWorkers[defaultWorkers.length - 1].dzial;
    let formDataBranchCpy = [...formData.branch];
    let branchArray = [];
    defaultWorkers.forEach((person) => {
      branchArray.push(person.dzial);
    });
    if (branchArray.indexOf(lastItem) === branchArray.length - 1) {
      formDataBranchCpy.push(lastItem);
      return formDataBranchCpy;
    } else {
      return formData.branch;
    }
  };

  useEffect(() => {
    if (props.data.length !== defaultWorkers.length) {
      setFormData((prevState) => ({
        ...prevState,
        branch: branchArrayUpdate(defaultWorkers),
      }));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultWorkers]);

  function searchFilter(worker) {
    let splitedFormDataName = formData.name.split(" ", 2);
    if (splitedFormDataName.length === 1)
      return (
        worker.imie.toLowerCase().indexOf(formData.name.toLowerCase()) !== -1 ||
        worker.nazwisko.toLowerCase().indexOf(formData.name.toLowerCase()) !==
          -1
      );
    else
      return (
        (worker.imie
          .toLowerCase()
          .indexOf(splitedFormDataName[0].toLowerCase()) !== -1 &&
          worker.nazwisko
            .toLowerCase()
            .indexOf(splitedFormDataName[1].toLowerCase()) !== -1) ||
        (worker.imie
          .toLowerCase()
          .indexOf(splitedFormDataName[1].toLowerCase()) !== -1 &&
          worker.nazwisko
            .toLowerCase()
            .indexOf(splitedFormDataName[0].toLowerCase()) !== -1)
      );
  }

  function earningsFilter(person) {
    return (
      parseInt(person.wynagrodzenieKwota) >= formData.value[0] &&
      formData.value[1] >= parseInt(person.wynagrodzenieKwota)
    );
  }

  function branchFilter(person) {
    return formData.branch.indexOf(person.dzial) !== -1;
  }
  useEffect(() => {
    let filteredTable = [...defaultWorkers];
    filteredTable = filteredTable.filter(searchFilter);
    filteredTable = filteredTable.filter(earningsFilter);
    filteredTable = filteredTable.filter(branchFilter);
    setWorkersList(filteredTable);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  const handleSearchChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      name: event.target.value,
    }));
  };
  const handleSliderChange = (event, value) => {
    setFormData((prevState) => ({
      ...prevState,
      value: value,
    }));
  };

  const branchCheckboxGenerator = (array) => {
    return array.map((branch,index) => {
      return (
        <CheckboxComponent
          branch={branch}
          setFormData={setFormData}
          formData={formData}
          key={index}
        />
      );
    });
  };
  return (
    <div className="search-panel-container">
      <InputGroup>
        <FormControl
          type="text"
          placeholder="Wyszukaj"
          aria-label="Wyszukaj"
          value={formData.name}
          onChange={handleSearchChange}
        ></FormControl>
      </InputGroup>
      <Slider
        value={formData.value}
        min={0}
        max={maxEarningFill()}
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
      />
      <InputGroup>
        <Form.Group controlId="formBasicCheckbox">
          {branchCheckboxGenerator(branchArrayCreator(defaultWorkers))}
        </Form.Group>
      </InputGroup>
    </div>
  );
}

export default SearchPanel;
