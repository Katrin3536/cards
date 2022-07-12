import React from "react";
import style from "./CardInfo.module.css";
import commonStyle from "../../assets/styles/Common.module.css";
import { Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { PATH } from "../../components/common/routes/RoutesConstants";

export const CardInfo: React.FC = () => {
  const navigate = useNavigate();

  interface LocationType {
    question: string;
    answer: string;
  }

  const location = useLocation();
  let { question, answer } = location.state as LocationType;

  return (
    <div className={commonStyle.container}>
      <div className={style.wrapper}>
        <div className={style.heading}>
          <h2 className={commonStyle.title}>Card info</h2>
        </div>
        <div className={style.infoItem}>
          <span className={style.label}>Question</span>
          <h4 className={style.title}>{question.slice(0, 40)}</h4>
        </div>
        <div className={style.infoItem}>
          <span className={style.label}>Answer</span>
          <h4 className={style.title}>{answer.slice(0, 40)}</h4>
        </div>
        <div className={style.controls}>
          <div className={style.btn}>
            <Button
              //   type={"submit"}
              variant={"contained"}
              color={"primary"}
              style={{ width: "30%" }}
              onClick={() => navigate(PATH.CARDS_LIST)}
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
