import React, { Fragment } from "react";
import Auth from "./Auth";

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
      <Auth />
    </Fragment>
  );
}
