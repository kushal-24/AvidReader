import React from "react";
import { circOut, motion } from "framer-motion";
import { Header } from "./components";
import {Footer} from "./components"

function Transition(OgComponent) {
  //takes a componenet from the user and
  return function WrappedComponent(props) {
    //returns the modified component
    return (
      <>
        <OgComponent {...props}/>
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 1 }}
          transition={{
            duration: 1,
            ease: "circOut",
          }}
          className="fixed inset-0 bg-warm-gradient pointer-events-none"
        />

      </>
    );
  };
}

export default Transition;
/*
-->First div fades in the dark background (opacity 0 → 1).
-->Second div fades out the gradient (opacity 1 → 0).
-->Together, they create a smooth overlay transition effect — useful for route changes, modals, or screen fades.
*/
