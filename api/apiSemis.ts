/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import Papa from "papaparse";

import {Product} from "./types";

export default {
  list: async (): Promise<Product[]> => {
    return axios
      .get(
        `https://docs.google.com/spreadsheets/d/e/2PACX-1vQDvLSAC80UOWOYd6dC6Ns0uoL81keyl1vR_z2ufEXdceQhvVaeY0yYyz_3rFe1We3hxMb1rEYAIlgU/pub?output=csv`,
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

