import React, { useState, useRef, useEffect } from "react";
import { Table, Button, FormControl } from "react-bootstrap";
import Summary from "./Summary";
import OutsideClickHandler from "react-outside-click-handler";
function List(props) {
  const [messageStatus, setMessageStatus] = useState(false);
  const heightRef = useRef({
    height: 0,
  });
  useEffect(() => {
    if (props.filtredWorkersArray.length >= 9)
      heightRef.current.height = nodeRef.current.offsetHeight;
  }, [props.defaultWorkers]);
  const nodeRef = useRef(null);
  const [newPersonData, setNewPersonData] = useState({
    imie: "",
    nazwisko: "",
    dzial: "",
    wynagrodzenieKwota: "",
    wynagrodzenieWaluta: "PLN",
  });
  const handleChange = (e, property) => {
    setMessageStatus(false);
    let text = e.target.value;
    setNewPersonData((prevState) => ({
      ...prevState,
      [property]: text,
    }));
  };
  const addPerson = (e) => {
    e.preventDefault();
    let validated = true;
    Object.keys(newPersonData).forEach((e) => {
      if (newPersonData[e] === "") {
        validated = false;
        setMessageStatus(!messageStatus);
      }
    });
    if (validated)
      props.setDefaultWorkers([...props.defaultWorkers, newPersonData]);
    setNewPersonData({
      imie: "",
      nazwisko: "",
      dzial: "",
      wynagrodzenieKwota: "",
      wynagrodzenieWaluta: "PLN",
    });
  };
  return (
    <div className="table-container">
      <div
        className="workers-container"
        ref={nodeRef}
        style={
          props.filtredWorkersArray.length >= 10
            ? { overflowY: "scroll", height: heightRef.current.height }
            : {}
        }
      >
        <Table bordered hover variant="dark" className="table" responsive="md">
          <tbody>
            <tr>
              <th>imię</th>
              <th>nazwisko</th>
              <th>dział</th>
              <th>wynagrodzenie</th>
            </tr>
          </tbody>
          {props.filtredWorkersArray.map((person) => {
            return (
              <tbody>
                <tr>
                  <th>{person.imie}</th>
                  <th>{person.nazwisko}</th>
                  <th>{person.dzial}</th>
                  <th>
                    {`${person.wynagrodzenieKwota} ${person.wynagrodzenieWaluta}`}
                  </th>
                </tr>
              </tbody>
            );
          })}
        </Table>
      </div>
      <div className="add-person-container">
        <form action="" className="add-person-form ">
          <FormControl
            type="text"
            value={newPersonData.imie}
            placeholder="imię"
            required
            onChange={(e) => handleChange(e, "imie")}
          />

          <FormControl
            type="text"
            value={newPersonData.nazwisko}
            placeholder="nazwisko"
            required
            onChange={(e) => handleChange(e, "nazwisko")}
          />

          <FormControl
            type="text"
            value={newPersonData.dzial}
            placeholder="dział"
            required
            onChange={(e) => handleChange(e, "dzial")}
          />

          <FormControl
            type="number"
            value={newPersonData.wynagrodzenieKwota}
            placeholder="zarobki"
            required
            onChange={(e) => handleChange(e, "wynagrodzenieKwota")}
          />
          <Button
            type="submit"
            className="add-button"
            variant="dark"
            onClick={(e) => addPerson(e)}
          >
            +
          </Button>
          <div>
            <OutsideClickHandler
              onOutsideClick={() => {
                if (messageStatus) setMessageStatus(false);
              }}
            >
              <div
                className="message"
                style={
                  messageStatus
                    ? { visibility: "visible" }
                    : { visibility: "hidden" }
                }
              >
                Uzupełnij wszystkie pola
              </div>
            </OutsideClickHandler>
          </div>
        </form>
      </div>

      <div className="summary">
        <Summary defaultWorkers={props.defaultWorkers} />
      </div>
    </div>
  );
}

export default List;
