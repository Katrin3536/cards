import React from "react";
import style from "./CardInfo.module.css";
import commonStyle from "../../assets/styles/Common.module.css";
import { Button } from "@mui/material";
import { useLocation } from "react-router-dom";

// let { email } = location.state as propState;

export const CardInfo: React.FC = () => {
  interface LocationType {
    question: string;
    answer: string;
  }

  const location = useLocation();
  console.log(location);
  let { question, answer } = location.state as LocationType;

  return (
    <div className={commonStyle.container}>
      <div className={style.wrapper}>
        <div className={style.heading}>
          <h2 className={commonStyle.title}>Card info</h2>
        </div>
        <div className={style.infoItem}>
          <span className={style.label}>Question</span>
          <h4 className={style.title}>{question}</h4>
        </div>
        <div className={style.infoItem}>
          <span className={style.label}>Answer</span>
          <h4 className={style.title}>{answer}</h4>
        </div>
        <div className={style.controls}>
          <div className={style.btn}>
            <Button
              //   type={"submit"}
              variant={"contained"}
              color={"primary"}
              style={{ width: "30%" }}
              disabled={true}
            >
              Cancel
            </Button>
            <Button
              //   type={"submit"}
              variant={"contained"}
              color={"primary"}
              style={{ width: "30%" }}
              //   disabled={disableBtn}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
