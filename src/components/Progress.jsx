import React from "react";
import { PageHeader, Tab, Tabs, Box } from "grommet";
import TroubledSign from "./TroubledSign";
import SignProgress from "./SignProgress";

export default function Progress() {
  return (
    <>
      <PageHeader
        title="Your Cuneiform Report"
        subtitle="See how much you've learned and what your mistakes are."
      />
      <Tabs alignControls="start">
        <Tab title="My Mistakes">
          <TroubledSign />
        </Tab>
        <Tab title="Sign Progress">
          <SignProgress />
        </Tab>
      </Tabs>
    </>
  );
}
