import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Standard } from './components/Standard';
import { Focal } from './components/Focal';
import { SVG } from './components/SVG';
import { ContainInside } from './components/ContainInside';
import { ContainOutside } from './components/ContainOutside';
import { DisabledXAxis } from './components/DisabledXAxis';
import { DisabledYAxis } from './components/DisabledYAxis';
import { PanzoomWithinPanzoom } from './components/PanzoomWithinPanzoom';
import { Exclude } from './components/Exclude';
import { Rotate } from './components/Rotate';

import 'bulma/css/bulma.min.css';
import { Tabs } from 'react-bulma-components';
import Tab from 'react-bulma-components/esm/components/tabs/components/tab';

function App() {
  const [active1, setActive1] = useState(true);
  const [active2, setActive2] = useState(false);
  const [active3, setActive3] = useState(false);
  const [active4, setActive4] = useState(false);
  const [active5, setActive5] = useState(false);
  const [active6, setActive6] = useState(false);
  const [active7, setActive7] = useState(false);
  const [active8, setActive8] = useState(false);
  const [active9, setActive9] = useState(false);
  const [active10, setActive10] = useState(false);

  const resetActive = () => {
    setActive1(false);
    setActive2(false);
    setActive3(false);
    setActive4(false);
    setActive5(false);
    setActive6(false);
    setActive7(false);
    setActive8(false);
    setActive9(false);
    setActive10(false);
  };

  const handleChangeTab = (e, tabNumber) => {
    resetActive();

    switch (tabNumber) {
      case 1:
        setActive1(true);
        break;
      case 2:
        setActive2(true);
        break;
      case 3:
        setActive3(true);
        break;
      case 4:
        setActive4(true);
        break;
      case 5:
        setActive5(true);
        break;
      case 6:
        setActive6(true);
        break;
      case 7:
        setActive7(true);
        break;
      case 8:
        setActive8(true);
        break;
      case 9:
        setActive9(true);
        break;
      case 10:
        setActive10(true);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Tabs>
        <Tab
          active={active1}
          onClick={(e) => {
            handleChangeTab(e, 1);
          }}
        >
          Standard
        </Tab>
        <Tab
          active={active2}
          onClick={(e) => {
            handleChangeTab(e, 2);
          }}
        >
          Focal
        </Tab>
        <Tab
          active={active3}
          onClick={(e) => {
            handleChangeTab(e, 3);
          }}
        >
          SVG
        </Tab>
        <Tab
          active={active4}
          onClick={(e) => {
            handleChangeTab(e, 4);
          }}
        >
          ContainInside
        </Tab>
        <Tab
          active={active5}
          onClick={(e) => {
            handleChangeTab(e, 5);
          }}
        >
          ContainOutside
        </Tab>
        <Tab
          active={active6}
          onClick={(e) => {
            handleChangeTab(e, 6);
          }}
        >
          Exclude
        </Tab>
        <Tab
          active={active7}
          onClick={(e) => {
            handleChangeTab(e, 7);
          }}
        >
          DisabledXAxis
        </Tab>
        <Tab
          active={active8}
          onClick={(e) => {
            handleChangeTab(e, 8);
          }}
        >
          DisabledYAxis
        </Tab>
        <Tab
          active={active9}
          onClick={(e) => {
            handleChangeTab(e, 9);
          }}
        >
          Rotate
        </Tab>
        <Tab
          active={active10}
          onClick={(e) => {
            handleChangeTab(e, 10);
          }}
        >
          PanzoomWithinPanzoom
        </Tab>
      </Tabs>

      <div className="container">
        <Standard active={active1} />
        <Focal active={active2} />
        <SVG active={active3} />
        <ContainInside active={active4} />
        <ContainOutside active={active5} />
        <Exclude active={active6} />
        <DisabledXAxis active={active7} />
        <DisabledYAxis active={active8} />
        <Rotate active={active9} />
        <PanzoomWithinPanzoom active={active10} />
      </div>
    </>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
