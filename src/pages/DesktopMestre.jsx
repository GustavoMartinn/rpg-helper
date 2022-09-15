import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ItemCardDesktop from "../components/ItemCardDesktop";
import JogadorCardDesktop from "../components/JogadorCardDesktop";

import { getCampanhas, getItens, getPersonagens } from "../services/querys";

export default function DesktopMestre() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const [campain, setCampain] = React.useState("");
  const [itens, setItens] = React.useState([]);
  const [personagens, setPersonagens] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  React.useEffect(() => {
    if (urlParams.get("campanha")) {
      setCampain(urlParams.get("campanha"));
    }
  }, []);

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await getCampanhas().then((res) => {
        if (active) {
          setOptions(res);
        }
      });
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  React.useEffect(() => {
    if (campain) {
      if (history.pushState) {
        var newurl =
          window.location.protocol +
          "//" +
          window.location.host +
          window.location.pathname +
          `?campanha=${campain}`;
        window.history.pushState({ path: newurl }, "", newurl);
      }
      (async () => {
        await getItens(campain).then((res) => {
          if (res) {
            setItens(res);
          }
        });
      })();
      (async () => {
        await getPersonagens(campain).then((res) => {
          if (res) {
            setPersonagens(res);
          }
        });
      })();
    }
  }, [campain]);

  return (
    <React.Fragment>
      <Grid container>
        <Grid container item xs={3} direction="column">
          <Grid item>
            <Autocomplete
              id="choose-campain"
              sx={{ width: "90%", margin: "1rem" }}
              open={open}
              onOpen={() => {
                setOpen(true);
              }}
              onClose={() => {
                setOpen(false);
              }}
              getOptionLabel={(option) => option}
              options={options}
              loading={loading}
              onChange={(event, newValue) => {
                setCampain(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Escolha uma campanha"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {loading ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                  }}
                />
              )}
            />
          </Grid>
          {itens.length !== 0 && (
            <Grid container item padding={1} spacing={1}>
              {itens.map((item, index) => {
                return (
                  <Grid item xs={12} key={`item-${index}`}>
                    <ItemCardDesktop item={item} personagens={personagens} />
                  </Grid>
                );
              })}
            </Grid>
          )}
        </Grid>
        <Grid
          container
          item
          xs={9}
          padding={1}
          spacing={1}
          sx={{ marginBottom: "-28px" }}
        >
          {personagens &&
            personagens.map((personagem, index) => {
              return (
                <Grid item xs={6} sm={4} xl={3} key={`personagem-${index}`}>
                  <JogadorCardDesktop personagem={personagem} />
                </Grid>
              );
            })}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
