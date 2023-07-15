import axios from 'axios'
import React, { useEffect, useState } from 'react'

// önerilen başlangıç stateleri
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 //  "B" nin bulunduğu indexi
const theGrid = ["(1,1)", "(2,1)", "(3,1)", "(1,2)", "(2,2)", "(3,2)", "(1,3)", "(2,3)", "(3,3)"]

export default function AppFunctional(props) {

  const [coordState, setCoordState] = useState(initialIndex);
  const [message, SetMessage] = useState(initialMessage);
  const [steps, setSteps] = useState(initialSteps);
  const [theEmail, setTheEmail] = useState(initialEmail);

  function getXY() {
    return theGrid[coordState];
  }

  function ilerle(yon) {
    if (yon === "left") {
      coordState % 3 !== 0 ? (
        setCoordState(coordState - 1),
        SetMessage(initialMessage),
        setSteps(steps + 1))
        : SetMessage("Sola gidemezsiniz")
    }
    if (yon === "right") {
      coordState % 3 !== 2 ? (
        setCoordState(coordState + 1),
        SetMessage(initialMessage),
        setSteps(steps + 1))
        : SetMessage("Sağa gidemezsiniz")
    }
    if (yon === "up") {
      coordState > 2 ? (
        setCoordState(coordState - 3),
        SetMessage(initialMessage),
        setSteps(steps + 1))
        : SetMessage("Yukarıya gidemezsiniz")
    }
    if (yon === "down") {
      coordState < 6 ? (
        setCoordState(coordState + 3),
        SetMessage(initialMessage),
        setSteps(steps + 1))
        : SetMessage("Aşağıya gidemezsiniz")
    }
    if (yon === "reset") {
      setCoordState(initialIndex);
      SetMessage(initialMessage);
      setSteps(initialSteps);
      setTheEmail(initialEmail)
    }
  }

  function onSubmit(event) {
    event.preventDefault()
    let theData = {
      "x": theGrid[coordState][1],
      "y": theGrid[coordState][3],
      "steps": steps,
      "email": theEmail
    };

    const config  = {
      method: "post",
      url: "http://localhost:9000/api/result",
      headers: {
        "Content-Type": "application/json",
      },
      data: theData,
    };

    axios(config)
    .then((res) => {
      SetMessage(res.data.message);
    })
    .catch((err) => {
      SetMessage(err.response.data.message);
    })
    .finally(()=> {
      setTheEmail(initialEmail);
    });
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Koordinatlar {getXY()}</h3>
        <h3 id="steps">{steps} kere ilerlediniz</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === coordState ? ' active' : ''}`}>
              {idx === coordState ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button onClick={(e) => ilerle(e.target.id)} id="left">SOL</button>
        <button onClick={(e) => ilerle(e.target.id)} id="up">YUKARI</button>
        <button onClick={(e) => ilerle(e.target.id)} id="right">SAĞ</button>
        <button onClick={(e) => ilerle(e.target.id)} id="down">AŞAĞI</button>
        <button onClick={(e) => ilerle(e.target.id)} id="reset">reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input onChange={(e) => setTheEmail(e.target.value)} id="email" type="email" placeholder="email girin" value={theEmail}></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}