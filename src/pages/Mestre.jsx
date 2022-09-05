import { Grid } from "@mui/material";
import React from "react";
import ItemCard from "../components/ItemCard";
import JogadorCard from "../components/JogadorCard";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { getCampanhas, getItens, getPersonagens } from "../services/querys";

export default function Mestre() {
  const [campain, setCampain] = React.useState("");
  const [itens, setItens] = React.useState([]);
  const [personagens, setPersonagens] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

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
            console.log(newValue);
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
      <Accordion>
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

const topFilms = ["Frango"];
