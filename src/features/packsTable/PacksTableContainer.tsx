import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../bll/store";
import { Navigate } from "react-router-dom";
import { PATH } from "../../components/common/routes/RoutesConstants";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import { isLoggedInSelector } from "../../bll/reducers/auth-reducer";
import { appStatusSelect } from "../../bll/reducers/app-reducer";
import { Box } from "@mui/material";
import { PacksTable } from "./PacksTable";
import style from "./PacksTableContainer.module.css";
import { SearchForm } from "../searchForm/SearchForm";

const ariaLabel = { "aria-label": "description" };

export const PacksTableContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(isLoggedInSelector);
  const status = useAppSelector(appStatusSelect);

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} />;
  }

  // const onClickHandler = () => {
  //   dispatch(getCardsListTC());
  // };

  return (
    <>
      {status === "loading" && <LinearProgress />}
      <Box className={style.container}>
        <Grid container justifyContent="center" spacing={1}>
          <Grid item xs={2} className={style.leftSide}>
            <h4 className={style.leftTitle}>Show packs cards</h4>
            <button>my</button>
            {/* <button onClick={onClickHandler}>all</button> */}
          </Grid>

          <Grid item xs={10} className={style.rightSide}>
            <h4 className={style.rightTitle}>Packs list</h4>
            <div>
              <SearchForm />
              <button>add new pack</button>
            </div>
            <PacksTable />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
