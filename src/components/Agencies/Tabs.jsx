import { Tabs, Tab } from "@mui/material";

export default function TabPanel() {
  return (
    <Tabs
      indicatorColor="secondary"
      aria-label="secondary tabs example"
    >
    <Tab value="one" label="Fiches" />
    <Tab value="two" label="Tableau" />
    <Tab value="three" label="Map" />
    </Tabs>

  );
}