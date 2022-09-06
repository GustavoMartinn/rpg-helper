import React from "react";

import { useNavigate } from "react-router-dom";

import {
  Grid,
  Button,
  TextField,
  Autocomplete,
  CircularProgress,
} from "@mui/material";

import {
  createPersonagem,
  getCampanhas,
  getPersonagens,
} from "../services/querys";

export default function Jogador() {
  const [campanha, setCampanha] = React.useState("");
  const [personagem, setPersonagem] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  const [open2, setOpen2] = React.useState(false);
  const [options2, setOptions2] = React.useState([]);
  const loading2 = open2 && options2.length === 0;

  const [novoPersonagem, setNovoPersonagem] = React.useState(false);
  const [novoPersonagemNome, setNovoPersonagemNome] = React.useState("");

  const history = useNavigate();

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
    let active = true;

    if (!loading2) {
      return undefined;
    }

    (async () => {
      await getPersonagens(campanha).then((res) => {
        if (active) {
          setOptions2([...res, { nome: "Criar novo personagem" }]);
        }
      });
    })();

    return () => {
      active = false;
    };
  }, [loading2]);

  function acessaInventario() {
    history(
      `/inventario?jogador=${personagem.nome}&id=${personagem.id}&campanha=${campanha}`
    );
  }

  const handleChoosePersonagem = (event, newValue) => {
    if (newValue.nome === "Criar novo personagem") {
      setNovoPersonagem(true);
    } else {
      setPersonagem(newValue);
    }
  };

  const criaPersonagem = async () => {
    await createPersonagem(novoPersonagemNome, campanha).then((res) => {
      if (!res.sucesso) return;
      setPersonagem({ nome: novoPersonagemNome, id: res.id });
      setNovoPersonagem(false);
    });
  };

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
            setCampanha(newValue);
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
        {campanha && (
          <Autocomplete
            id="choose-campain"
            sx={{ width: "100vw", margin: "1rem" }}
            open={open2}
            onOpen={() => {
              setOpen2(true);
            }}
            onClose={() => {
              setOpen2(false);
            }}
            getOptionLabel={(option) => option.nome}
            options={options2}
            loading={loading2}
            onChange={handleChoosePersonagem}
            noOptionsText="Criar novo personagem"
            renderInput={(params) => (
              <TextField
                {...params}
                label="Escolha um personagem"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {loading2 ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
              />
            )}
          />
        )}
        {personagem && (
          <Button
            fullWidth
            sx={{ margin: "16px" }}
            variant="outlined"
            onClick={acessaInventario}
          >
            Acessar inventario de {personagem.nome}
          </Button>
        )}
        {novoPersonagem && (
          <React.Fragment>
            <TextField
              sx={{ margin: "16px", width: "calc(100% - 32px)" }}
              id="outlined-name"
              label="Nome do personagem"
              variant="standard"
              value={novoPersonagemNome}
              onChange={(e) => setNovoPersonagemNome(e.target.value)}
            />
            <Button
              sx={{ margin: "16px", width: "calc(100% - 32px)" }}
              variant="outlined"
              onClick={criaPersonagem}
            >
              Criar Personagem
            </Button>
          </React.Fragment>
        )}
      </Grid>
    </React.Fragment>
  );
}

const topFilms = ["Frango"];
