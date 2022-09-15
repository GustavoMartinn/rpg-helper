import { Autocomplete, CircularProgress, Grid, TextField } from "@mui/material";
import React from "react";
import JogadorCardDesktop from "../components/JogadorCardDesktop";

import { getCampanhas, getItens, getPersonagens } from "../services/querys";

export default function DesktopMestre() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const [campain, setCampain] = React.useState("");
  const [itens, setItens] = React.useState([]);
  const [personagens, setPersonagens] = React.useState([
    {
      status: [{ Vida: "10" }, { Sanidade: "25" }, { PE: "12" }],
      id: 1,
      nome: "Mestre",
      itens: [
        {
          id: 1,
          nome: "Frango frágil",
          descricao: "Frango dahora",
          atributos: "",
          imagem: "https://i.imgur.com/tbamfv7.jpeg",
          tag: "Frango",
          inclusao: "2022-09-04 19:46:34.201183",
        },
        {
          id: 2,
          nome: "Messi careca",
          descricao: "Messi careca kkkkkk",
          atributos: "",
          imagem: "https://i.imgur.com/GJkHegy.jpeg",
          tag: "Frango",
          inclusao: "2022-09-04 19:46:34.201183",
        },
      ],
      campanha: "Frango",
    },
    { status: [], id: 4, nome: "Rafael", itens: [], campanha: "Frango" },
    {
      status: [{ Vida: "10" }, { Sanidade: "25" }, { PE: "12" }],
      id: 1,
      nome: "Mestre",
      itens: [
        {
          id: 1,
          nome: "Frango frágil",
          descricao: "Frango dahora",
          atributos: "",
          imagem: "https://i.imgur.com/tbamfv7.jpeg",
          tag: "Frango",
          inclusao: "2022-09-04 19:46:34.201183",
        },
        {
          id: 2,
          nome: "Messi careca",
          descricao: "Messi careca kkkkkk",
          atributos: "",
          imagem: "https://i.imgur.com/GJkHegy.jpeg",
          tag: "Frango",
          inclusao: "2022-09-04 19:46:34.201183",
        },
      ],
      campanha: "Frango",
    },
    { status: [], id: 4, nome: "Rafael", itens: [], campanha: "Frango" },
    {
      status: [{ Vida: "10" }, { Sanidade: "25" }, { PE: "12" }],
      id: 1,
      nome: "Mestre",
      itens: [
        {
          id: 1,
          nome: "Frango frágil",
          descricao: "Frango dahora",
          atributos: "",
          imagem: "https://i.imgur.com/tbamfv7.jpeg",
          tag: "Frango",
          inclusao: "2022-09-04 19:46:34.201183",
        },
        {
          id: 2,
          nome: "Messi careca",
          descricao: "Messi careca kkkkkk",
          atributos: "",
          imagem: "https://i.imgur.com/GJkHegy.jpeg",
          tag: "Frango",
          inclusao: "2022-09-04 19:46:34.201183",
        },
      ],
      campanha: "Frango",
    },
    { status: [], id: 4, nome: "Rafael", itens: [], campanha: "Frango" },
  ]);
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
          {itens && (
            <Grid container item>
              {itens.map((item, index) => {
                return (
                  <Grid item key={`item-${index}`}>
                    {item}
                  </Grid>
                );
              })}
            </Grid>
          )}
        </Grid>
        <Grid container item xs={9} padding={2} spacing={2}>
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
