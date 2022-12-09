/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import Papa from "papaparse";

import {Product} from "./types";

export default {
  list: async (): Promise<Product[]> => {
    return axios
      .get(
        `https://docs.google.com/spreadsheets/d/e/2PACX-1vQQMbiWH0YWb8AcjLjhjYqGl1N5iXw5TqOKBCGfGo-e4cJnOCP1M-cUzbyy32X53v0sSnCm960N8FH6/pub?output=csv`,
        {
          responseType: "blob",
        },
      )
      .then(
        (response) =>
          new Promise<Product[]>((resolve, _reject) => {
            Papa.parse(response.data, {
              header: true,
              complete: (results) => {
                const products = results.data as Product[];
                console.log(products)
                return resolve(
                  products.map((product) => ({
                    ...product
                  })),
                );
              },
            });
          }),
      );
  },
};

