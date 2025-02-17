/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
/* eslint-disable  object-curly-spacing*/
// /* eslint-disable no-undef */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

/** *********************************************************
 * Copyright (C) 2022
 * Worktez
 * Author: Simran Nigam <nigamsimran14@gmail.com>
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the MIT License
 *
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the MIT License for more details.
 ***********************************************************/
const {getFilterById, updateFilter} = require("../lib");

exports.editFilter = function(request, response) {
  const filterName = request.body.data.FilterName;
  const description = request.body.data.Description;
  const filterJson = request.body.data.FilterJson;
  const orgDomain = request.body.data.OrgDomain;
  const teamName = request.body.data.TeamName;
  const docId = request.body.data.Id;
  let result;
  let status = 200;

  const promise = getFilterById(orgDomain, teamName, docId).then((filterData) => {
    if (filterData == undefined) {
      result = {data: {status: "Filter does not exist"}};
    } else {
      const inputJson = {
        FilterName: filterName,
        Description: description,
        FilterJson: filterJson,
      };
      updateFilter(inputJson, orgDomain, teamName, docId);
    }
  }).catch((error) => {
    status = 500;
    console.log("Error:", error);
  });

  Promise.resolve(promise).then(() => {
    result = {data: {status: "OK"}};
    console.log("Filters edited Successfully");
    return response.status(status).send(result);
  })
      .catch((error) => {
        result = {data: error};
        console.error("Error editing Filter", error);
        return response.status(status).send(result);
      });
};
