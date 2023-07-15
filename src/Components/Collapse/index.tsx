import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import styles from "./Colapse.module.scss";
import { IEstagio } from "../../tipos/funcao";

interface Props {
  text: string;
  conteudo?: string;
  conteudoArray?: IEstagio[];
  icon?: JSX.Element;
}

export default function CollapseComponent({
  text,
  conteudo,
  icon,
  conteudoArray,
}: Props) {
  const [open, setOpen] = useState<boolean>(false);

  const handleClick = () => {
    setOpen(!open);
  };

  let borderColour: string;
  open ? (borderColour = "#3FC1C9") : (borderColour = "#222831");

  return (
    <>
      <ListItemButton
        onClick={handleClick}
        sx={{ border: "1px solid", borderColor: borderColour }}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={text} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse
        in={open}
        timeout="auto"
        unmountOnExit
        className={styles.collapseContein}
      >
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            {conteudo ? (
              <p>{conteudo}</p>
            ) : (
              <div className={styles.break}>
                {conteudoArray?.map((item, index) => (
                  <p key={index}>{`${item.resposta} ${"\n"}`}</p>
                ))}
              </div>
            )}
          </ListItemButton>
        </List>
      </Collapse>
    </>
  );
}
