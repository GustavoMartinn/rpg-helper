import React from "react";
import {
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  Autocomplete,
  CircularProgress,
  AppBar,
  Toolbar,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CachedIcon from "@mui/icons-material/Cached";
import ItemCard from "../components/ItemCard";
import JogadorCard from "../components/JogadorCardMobile";

import { getCampanhas, getItens, getPersonagens } from "../services/querys";

export default function MobileMestre() {
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
      <AppBar position="fixed">
        <Toolbar>
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <Grid item>
              <Typography variant="h6" component="div">
                Menu do Mestre
              </Typography>
            </Grid>
          </Grid>
          <IconButton
            sx={{ position: "absolute", right: 0 }}
            aria-label="reload"
            onClick={() => {
              document.location.reload(true);
            }}
          >
            <CachedIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Grid sx={{ margin: "56px" }}></Grid>
      <Grid container>
        <Autocomplete
          id="choose-campain"
          sx={{ width: "100vw", margin: "1rem" }}
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
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Itens</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container>
            {itens.map((item) => (
              <Grid
                item
                key={`${item.id}-${item.tag}`}
                sx={{ marginBottom: "16px" }}
              >
                <ItemCard item={item} personagens={personagens} />
              </Grid>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Personagens</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container>
            {personagens.map((personagem) => (
              <Grid key={`${personagem.id}-${personagem.nome}`}>
                <JogadorCard personagem={personagem} />
              </Grid>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </React.Fragment>
  );
}
