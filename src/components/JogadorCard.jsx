import * as React from "react";
import {
  Grid,
  Typography,
  IconButton,
  Card,
  CardHeader,
  CardContent,
  Tooltip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import { removeItem } from "../services/querys";

export default function JogadorCard({ personagem }) {
  const [itens, setItens] = React.useState(personagem.itens);
  const handleDelete = (idItem) => {
    removeItem(personagem.id, idItem);
    removeItemArray(idItem);
  };

  const removeItemArray = (idItem) => {
    const newItens = itens.filter((item) => item.id !== idItem);
    setItens(newItens);
  };

  return (
    <Card sx={{ width: "calc(100vw - 32px)" }}>
      <CardHeader title={personagem.nome} subheader={personagem.campanha} />
      <CardContent>
        {personagem.status.map((status) => {
          return (
            <Grid
              container
              spacing={2}
              justifyContent="space-between"
              alignItems="center"
              key={Object.keys(status)[0]}
            >
              <Grid item>
                <Typography variant="body2" color="text.secondary">
                  {Object.keys(status)[0]}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" color="text.secondary">
                  {Object.values(status)[0]}
                </Typography>
              </Grid>
            </Grid>
          );
        })}
      </CardContent>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography>Ver itens de {personagem.nome}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <CardContent>
            {itens &&
              itens.map((item) => {
                return (
                  <Grid
                    container
                    key={`${item.id}-${item.tag}`}
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Grid item>
                      <Typography key={`${item.id}-${item.tag}`}>
                        {item.nome}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Tooltip title="Deletar">
                        <IconButton
                          aria-label="delete"
                          onClick={() => handleDelete(item.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                  </Grid>
                );
              })}
          </CardContent>
        </AccordionDetails>
      </Accordion>
    </Card>
  );
}
