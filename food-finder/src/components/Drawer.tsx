import React from 'react';
import { Drawer, Grid, Stack, Switch, FormControlLabel, Autocomplete, TextField } from '@mui/material'; // Make sure to import necessary components

export default function CustomDrawer({ events: FoodEvent, inputStatus, setInputStatus, toTitleCase }) {
  return (
    <div>
      <Grid container>
        <div>
          <Grid item xs={3}>
            <Drawer
              variant="permanent"
              anchor="right"
              PaperProps={{
                sx: {
                  width: 240,
                  paddingLeft: 2,
                  paddingRight: 2,
                  paddingTop: 2,
                  backgroundColor: "#f0f0f0",
                },
              }}
            >
              <Stack>
                <FormControlLabel
                  control={
                    <Switch
                      onChange={(e) =>
                        setInputStatus({
                          ...inputStatus,
                          onCampusOnly: e.target.checked,
                        })
                      }
                      checked={inputStatus.onCampusOnly}
                    />
                  }
                  label="In Person Events"
                />
                <FormControlLabel
                  control={
                    <Switch
                      onChange={(e) =>
                        setInputStatus({
                          ...inputStatus,
                          excludeVolunteer: e.target.checked,
                        })
                      }
                      checked={inputStatus.excludeVolunteer}
                    />
                  }
                  label="Exclude Volunteer Events"
                />
                <FormControlLabel
                  control={
                    <Switch
                      onChange={(e) =>
                        setInputStatus({
                          ...inputStatus,
                          pizzaOnly: e.target.checked,
                        })
                      }
                      checked={inputStatus.pizzaOnly}
                    />
                  }
                  label="Pizza Events only"
                />

                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={events.map((event) => toTitleCase(event.food.cuisine))}
                  sx={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label="Cuisine" />}
                />
              </Stack>
            </Drawer>
          </Grid>
        </div>
      </Grid>
    </div>
  );
}