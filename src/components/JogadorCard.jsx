import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { addItem } from "../services/querys";

export default function JogadorCard({ personagem }) {
  return (
    <Card sx={{ width: "calc(100vw - 32px)" }}>
      <CardHeader title={personagem.nome} subheader={personagem.campanha} />
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography>Ver itens</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <CardContent>
            {personagem.itens &&
              personagem.itens.map((item) => {
                return (
                  <Typography key={`${item.id}-${item.tag}`} paragraph>
                    {item.nome}
                  </Typography>
                );
              })}
          </CardContent>
        </AccordionDetails>
      </Accordion>
    </Card>
  );
}
