import React, { memo } from "react";
import { Segment, Grid, Header } from "semantic-ui-react";

const Home = () => (
  <Segment style={{ padding: "8em 0em" }} vertical>
    <Grid container stackable verticalAlign="middle">
      <Grid.Row>
        <Grid.Column width={8}>
          <Header as="h3" style={{ fontSize: "2em" }}>
            You will get your dashboard here..
          </Header>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Segment>
);

Home.propTypes = {};

export default memo(Home);
