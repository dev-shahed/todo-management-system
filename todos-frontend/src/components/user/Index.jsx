import React, { Fragment } from "react";
import Signup from "./Signup";

const userTerms = [
  {
    id: 1,
    term: "Create an account",
    slug: "Fill your Information below and register with your social account",
  },
  {
    id: 2,
    term: "Sign In",
    slug: "Hi Welcome Back, you’ve been missed! Please sign in to continue",
  },
];

export default function User() {
  return (
    <Fragment>
      <div>
        {userTerms.map((termInfo) => (
          <div key={termInfo.id}>
            <h2>{termInfo.term}</h2>
            <p>{termInfo.slug}</p>
          </div>
        ))}
      </div>
      <Signup />
    </Fragment>
  );
}
